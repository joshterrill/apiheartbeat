const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EndpointMessageSchema = new Schema({
  message: String,
  dateTime: Date,
  ok: Boolean,
  status: String,
  endpointId: mongoose.Schema.Types.ObjectId,
});

const EndpointMessageModel = mongoose.model('EndpointMessage', EndpointMessageSchema);

module.exports = EndpointMessageModel;
