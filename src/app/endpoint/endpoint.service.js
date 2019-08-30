const heartbeat = require('../../lib/heartbeat');
const EndpointMessageModel = require('../../models/EndpointMessage');

async function checkEndpoint(endpoint) {
  return await heartbeat.checkHeartbeat(endpoint, true);
}

async function getMessages(userId, endpointId) {
  return await EndpointMessageModel.find({userId, endpointId}).sort({dateTime: -1});
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
  getMessages,
}