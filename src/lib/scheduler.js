const scheduler = require('node-schedule');
const heartbeat = require('./heartbeat');
const EndpointMessageModel = require('../models/EndpointMessage');
const notifiers = require('./notifiers');

function startScheduler() {
  const j = scheduler.scheduleJob('1 * * * * *', async () => {
    try {
      const endpoints = await heartbeat.findScheduledJobsToRun();
      console.log(`Checking ${endpoints.length} endpoints`);
      for (let endpoint of endpoints) {
        try {
          const check = await heartbeat.checkHeartbeat(endpoint);
          endpoint.isUp = check.ok;
          endpoint.nextHeartbeatDate = heartbeat.calculateNextHeartbeatDate(new Date(), endpoint.frequency, endpoint.interval);
          await Promise.all([
            endpoint.save(),
            EndpointMessageModel.create({
              message: check.message,
              ok: check.ok,
              status: check.status,
              dateTime: new Date(),
              endpointId: endpoint._id,
            }),
          ]);
        } catch (error) {
          endpoint.isUp = false;
          endpoint.nextHeartbeatDate = heartbeat.calculateNextHeartbeatDate(new Date(), endpoint.frequency, endpoint.interval);
          await Promise.all([
            endpoint.save(),
            EndpointMessageModel.create({
              message: error.message,
              ok: false,
              status: 'error',
              dateTime: new Date(),
              endpointId: endpoint._id,
            }),
          ]);
          notifiers.sendGmail('joshterrill.dev@gmail.com', endpoint, error.message);
          console.error(`Error retrieving endpoints at ${new Date()}, message: ${error.message}`);
        }
      }
    } catch (error) {
      console.error(`Error retrieving endpoints to check at ${new Date()}, message: ${error.message}`);
    }
  });
  return j;
}

module.exports = {
  startScheduler,
}