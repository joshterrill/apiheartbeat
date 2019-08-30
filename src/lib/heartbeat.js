const requestCallback = require('request');
const moment = require('moment');
const EndpointModel = require('../models/Endpoint');
const EndpointMessageModel = require('../models/EndpointMessage');

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

async function saveEndpointMessage(ok, status, message, isManualCheck, endpoint) {
  return await EndpointMessageModel.create({
    ok,
    status,
    message,
    dateTime: new Date(),
    isManualCheck,
    endpointId: endpoint._id,
    userId: endpoint.userId,
  });
}

async function checkHeartbeat(endpoint, isManualCheck) {
  try {
    const options = {
      headers: {
        referrer: 'https://apiheartbeat.com',
      },
    };
    const heartbeat = await request(endpoint.url, options);
    if (heartbeat && heartbeat.statusCode === endpoint.statusCode) {
      await saveEndpointMessage(true, 'success', 'Success', isManualCheck, endpoint);
      return {ok: true, status: 'success', message: 'Success'};
    } else if (heartbeat.body && heartbeat.statusCode !== endpoint.statusCode) {
      const message = `Endpoint returned with body but status code ${heartbeat.statusCode} does not match ${endpoint.statusCode}`;
      await saveEndpointMessage(true, 'warning', message, isManualCheck, endpoint);
      return {ok: true, status: 'warning', message};
    } else if (!heartbeat || !heartbeat.body || heartbeat.error) {
      await saveEndpointMessage(false, 'error', heartbeat.error, isManualCheck, endpoint);
      return {ok: false, status: 'error', message: heartbeat.error};
    }
  } catch (error) {
    await saveEndpointMessage(false, 'error', error.message, isManualCheck, endpoint);
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
    return await EndpointModel.find({nextHeartbeatDate: {$lte: dt}});
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  checkHeartbeat,
  calculateNextHeartbeatDate,
  findScheduledJobsToRun,
}