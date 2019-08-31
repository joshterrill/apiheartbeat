const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EndpointMessageSchema = new Schema({
  message: String,
  responseTime: Number,
  dateTime: Date,
  ok: Boolean,
  status: String,
  isManualCheck: Boolean,
  endpointId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
});

const EndpointMessageModel = mongoose.model('EndpointMessage', EndpointMessageSchema);

module.exports = EndpointMessageModel;
