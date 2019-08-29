const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EndpointSchema = new Schema({
  url: String,
  statusCode: Number,
  createdOn: Date,
  nextHeartbeatDate: Date,
  isActive: Boolean,
  userId: mongoose.Schema.Types.ObjectId,
});

const EndpointModel = mongoose.model('Endpoint', EndpointSchema);

module.exports = EndpointModel;
