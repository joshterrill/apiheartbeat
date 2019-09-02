const scheduler = require('node-schedule');
const heartbeat = require('./heartbeat');
const notifiers = require('./notifiers');
const UserModel = require('../models/User');

function startScheduler() {
  const j = scheduler.scheduleJob('1 * * * * *', async () => {
    try {
      const endpoints = await heartbeat.findScheduledJobsToRun();
      console.log(`Checking ${endpoints.length} endpoints`);
      for (let endpoint of endpoints) {
        try {
          const check = await heartbeat.checkHeartbeat(endpoint, false);
          endpoint.isUp = check.ok;
          endpoint.status = check.status;
          endpoint.nextHeartbeatDate = heartbeat.calculateNextHeartbeatDate(new Date(), endpoint.frequency, endpoint.interval);
          await endpoint.save();
          if (check.status === 'error') {
            const user = await UserModel.findById(endpoint.userId);
            if (user) {
              notifiers.sendGmail(user.email, endpoint, check.message);
            }
          }
        } catch (error) {
          endpoint.isUp = false;
          endpoint.status = 'error';
          endpoint.nextHeartbeatDate = heartbeat.calculateNextHeartbeatDate(new Date(), endpoint.frequency, endpoint.interval);
          await endpoint.save();
          const user = await UserModel.findById(endpoint.userId);
          if (user) {
            notifiers.sendGmail(user.email, endpoint, error.message);
          }
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