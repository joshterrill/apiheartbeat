const scheduler = require('node-schedule');
const heartbeat = require('./heartbeat');

function startScheduler() {
  const j = scheduler.scheduleJob('1 * * * * *', async () => {
    try {
      const endpoints = await heartbeat.findScheduledJobsToRun();
      console.log(`Checking ${endpoints.length} endpoints`);
      for (let endpoint of endpoints) {
        try {
          const check = await heartbeat.checkHeartbeat(endpoint, false);
          endpoint.isUp = check.ok;
          endpoint.nextHeartbeatDate = heartbeat.calculateNextHeartbeatDate(new Date(), endpoint.frequency, endpoint.interval);
          await endpoint.save();
          if (check.status === 'error') {
            // todo: send notification
          }
        } catch (error) {
          endpoint.isUp = false;
          endpoint.nextHeartbeatDate = heartbeat.calculateNextHeartbeatDate(new Date(), endpoint.frequency, endpoint.interval);
          await endpoint.save();
          // todo: send notification
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