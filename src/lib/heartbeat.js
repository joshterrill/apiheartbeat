const requestCallback = require('request');
const moment = require('moment');
const EndpointModel = require('../models/Endpoint');
const EndpointMessageModel = require('../models/EndpointMessage');
const ObjectID = require('mongoose').Types.ObjectId;

async function request(url, options) {
  return new Promise((resolve, reject) => {
    requestCallback(url, options, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve({...response, body});
    });
  });
}

async function saveEndpointMessage(ok, status, message, isManualCheck, responseTime, endpoint) {
  let lastEndpointMessage = await EndpointMessageModel.find({endpointId: endpoint._id}).sort({dateTime: -1}).limit(1);
  lastEndpointMessage = lastEndpointMessage[0];
  if (lastEndpointMessage && lastEndpointMessage.message === message && lastEndpointMessage.status === status) {
    return await EndpointMessageModel.updateOne(
      {_id: ObjectID(lastEndpointMessage._id)},
      { $set: { dateTime : new Date(), numberOfTimes: lastEndpointMessage.numberOfTimes + 1, responseTime } },
      {upsert: true, safe: true},
    );
  } else {
    return await EndpointMessageModel.create({
      ok,
      status,
      message,
      responseTime,
      dateTime: new Date(),
      isManualCheck,
      numberOfTimes: 1,
      endpointId: endpoint._id,
      userId: endpoint.userId,
    });
  }
}

async function checkHeartbeat(endpoint, isManualCheck) {
  try {
    const options = {
      time: true,
      headers: {
        referrer: 'https://apiheartbeat.com',
      },
    };
    const heartbeat = await request(endpoint.url, options);
    if (!heartbeat || !heartbeat.body || heartbeat.error) {
      await saveEndpointMessage(false, 'error', heartbeat.error, isManualCheck, heartbeat.elapsedTime, endpoint);
      return {ok: false, status: 'error', message: heartbeat.error};
    } else if (heartbeat && heartbeat.statusCode === endpoint.statusCode && endpoint.responseTime > heartbeat.elapsedTime) {
      await saveEndpointMessage(true, 'ok', 'Success', isManualCheck, heartbeat.elapsedTime, endpoint);
      return {ok: true, status: 'ok', message: 'Success'};
    } else if (heartbeat.body && heartbeat.statusCode !== endpoint.statusCode) {
      const message = `Response status code ${heartbeat.statusCode} does not match expected status code ${endpoint.statusCode}`;
      await saveEndpointMessage(true, 'warning', message, isManualCheck, heartbeat.elapsedTime, endpoint);
      return {ok: true, status: 'warning', message};
    } else if (heartbeat.body && endpoint.responseTime < heartbeat.elapsedTime) {
      const message = `Response time ${heartbeat.elapsedTime} ms does not meet expected response time ${endpoint.responseTime} ms`;
      await saveEndpointMessage(true, 'warning', message, isManualCheck, heartbeat.elapsedTime, endpoint);
      return {ok: true, status: 'warning', message};
    }
  } catch (error) {
    await saveEndpointMessage(false, 'error', error.message, isManualCheck, -1, endpoint);
    return {ok: false, status: 'error', message: error.message};
  }
}

function calculateNextHeartbeatDate(lastDate, frequency, interval) {
  // interval = minutes, hours, days, weeks, months
  return moment(lastDate || new Date(), "DD-MM-YYYY").add(frequency || 1, interval || 'days');
}

async function findScheduledJobsToRun() {
  try {
    // give ourselves a little room
    const dt = new Date();
    dt.setSeconds( dt.getSeconds() + 10 );
    return await EndpointModel.find({isActive: true, nextHeartbeatDate: {$lte: dt}});
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  checkHeartbeat,
  calculateNextHeartbeatDate,
  findScheduledJobsToRun,
}