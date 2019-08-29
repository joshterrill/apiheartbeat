const request = require('async-request');
const moment = require('moment');
const EndpointModel = require('../models/Endpoint');

module.exports = {
  checkHeartbeat: async (endpoint) => {
    const options = {
      headers: {
        referrer: 'https://apiheartbeat.com',
      },
    };
    const heartbeat = await request(endpoint.url, options);
    if (heartbeat && heartbeat.statusCode === endpoint.statusCode) {
      return {ok: true, message: 'Success'};
    } else if (heartbeat.body && heartbeat.statusCode !== endpoint.statusCode) {
      return {ok: true, message: `Endpoint returned with body but status code ${heartbeat.statusCode} does not match ${endpoint.statusCode}`};
    } else if (!heartbeat || !heartbeat.body || heartbeat.error) {
      return {ok: false, message: heartbeat.error};
    }
  },
  calculateNextHeartbeatDate: (lastDate, frequency, interval) => {
    // interval = minutes, hours, days, weeks, months
    return moment(lastDate || new Date(), "DD-MM-YYYY").add(frequency || 1, interval || 'days');
  },
  findScheduledJobsToRun: async () => {
    try {
      // give ourselves a little room
      const dt = new Date();
      dt.setSeconds( dt.getSeconds() + 10 );
      return await EndpointModel.find({nextHeartbeatDate: {$lte: dt}});
    } catch (error) {
      throw new Error(error);
    }
  },
}
