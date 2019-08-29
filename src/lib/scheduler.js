const scheduler = require('node-schedule');
const heartbeat = require('./heartbeat');
const EndpointMessageModel = require('../models/EndpointMessage');
const notifiers = require('./notifiers');

module.exports = {

  startScheduler: () => {
    var j = scheduler.scheduleJob('1 * * * * *', async () => {
      try {
        const endpoints = await heartbeat.findScheduledJobsToRun();
        console.log(`Checking ${endpoints.length} endpoints`);
        for (let endpoint of endpoints) {
          const check = await heartbeat.checkHeartbeat(endpoint);
          const now = new Date();
          if (check && check.ok) {
            endpoint.isUp = true;
          } else {
            endpoint.isUp = false;
            // todo: figure out a way to make this work, right now it fails and never gets here
            notifiers.sendGmail('joshterrill.dev@gmail.com', endpoint, check.message);
          }
          endpoint.nextHeartbeatDate = heartbeat.calculateNextHeartbeatDate(now, endpoint.frequency, endpoint.interval);
          await endpoint.save();
          const endpointMessage = new EndpointMessageModel();
          endpointMessage.isNew = true;
          endpointMessage.message = check.message;
          endpointMessage.ok = check.ok;
          endpointMessage.dateTime = now;
          endpointMessage.endpointId = endpoint._id;
          await endpointMessage.save();
        }
      } catch (error) {
        console.error(`Error retrieving endpoints at ${new Date()}, message: ${error.message}`);
      }
    });
    return j;
  },
}