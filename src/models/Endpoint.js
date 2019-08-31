const mongoose = require('mongoose');
const EndpointMessageSchema = require('./EndpointMessage').schema;
const Schema = mongoose.Schema;

const EndpointSchema = new Schema({
  url: String,
  statusCode: {type: Number, default: 200},
  responseTime: Number,
  createdOn: {type: Date, default: new Date()},
  frequency: Number,
  interval: String,
  nextHeartbeatDate: Date,
  isActive: {type: Boolean, default: true},
  isUp: {type: Boolean, default: true},
  status: {type: String, default: 'ok'},
  userId: mongoose.Types.ObjectId,
});

const EndpointModel = mongoose.model('Endpoint', EndpointSchema);

module.exports = EndpointModel;
