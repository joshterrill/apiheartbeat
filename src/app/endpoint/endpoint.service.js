const heartbeat = require('../../lib/heartbeat');
const EndpointMessageModel = require('../../models/EndpointMessage');
const EndpointModel = require('../../models/Endpoint');

async function checkEndpoint(endpoint) {
  return await heartbeat.checkHeartbeat(endpoint, true);
}

async function getMessages(userId, endpointId) {
  if (endpointId) {
    return await EndpointMessageModel.find({userId, endpointId}).sort({dateTime: -1});
  }
  return await EndpointMessageModel.find({userId}).sort({dateTime: -1});
}

async function getEndpoints(userId) {
  return await EndpointModel.find({userId}).sort({createdOn: -1});
}

async function updateEndpointStatus(endpointId, isActive) {
  return await EndpointModel.updateOne({_id: endpointId}, {$set: {isActive}}, {upsert: true, safe: true});
}

async function deleteEndpoint(endpointId) {
  return await Promise.all([
    EndpointModel.findByIdAndDelete(endpointId),
    EndpointMessageModel.deleteMany({endpointId}),
  ]);
}

async function saveEndpoint(endpoint, userId) {
  return await EndpointModel.create({
    ...endpoint,
    createdOn: new Date(),
    nextHeartbeatDate: heartbeat.calculateNextHeartbeatDate(null, endpoint.frequency, endpoint.interval),
    isActive: true,
    userId,
  });
}

module.exports = {
  checkEndpoint,
  saveEndpoint,
  getMessages,
  getEndpoints,
  updateEndpointStatus,
  deleteEndpoint,
}