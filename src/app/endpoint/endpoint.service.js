const heartbeat = require('../../lib/heartbeat');
const EndpointMessageModel = require('../../models/EndpointMessage');
const EndpointModel = require('../../models/Endpoint');

async function checkEndpoint(endpoint) {
  return await heartbeat.checkHeartbeat(endpoint, true);
}

async function getMessages(userId, endpointId, loadAll) {
  const limit = loadAll === 'true' ? null : 20
  if (endpointId) {
    return await EndpointMessageModel.find({userId, endpointId}).sort({dateTime: -1}).limit(limit);
  }
  return await EndpointMessageModel.find({userId}).sort({dateTime: -1}).limit(limit);
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
  if (endpoint._id) {
    return await EndpointModel.updateOne(
      {_id: endpoint._id},
      {
        ...endpoint,
      }
    );
  }
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