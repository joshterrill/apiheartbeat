const heartbeat = require('../../lib/heartbeat');

async function checkEndpoint(endpoint) {
  return await heartbeat.checkHeartbeat(endpoint);
}

async function saveEndpoint(endpoint) {
  const endpoint = await EndpointModel.create({
    ...endpoint,
    createdOn: new Date(),
    nextHeartbeatDate: heartbeat.calculateNextHeartbeatDate(null, endpoint.frequency, endpoint.interval),
    isActive: true,
    userId: req.token._id,
  });
  return {ok: true, status: 'success', message: 'Saved successfully'};
}

module.exports = {
  checkEndpoint,
  saveEndpoint,
}