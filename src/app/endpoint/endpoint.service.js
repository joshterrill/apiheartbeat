const heartbeat = require('../../lib/heartbeat');

async function checkEndpoint(req, res, next) {
  const endpoint = req.body;
  try {
    const heartbeatRes = await heartbeat.checkHeartbeat(endpoint);
    res.json(heartbeatRes);
  } catch (error) {
    res.json({ok: false, status: 'error', message: error.message});
  }
}

async function saveEndpoint(req, res, next) {
  try {
    const data = req.body;
    await EndpointModel.create({
      ...data,
      createdOn: new Date(),
      nextHeartbeatDate: heartbeat.calculateNextHeartbeatDate(null, data.frequency, data.interval),
      isActive: true,
      userId: req.token._id,
    });
    res.json({ok: true, message: 'Saved new endpoint'});
  } catch (error) {
    res.json({ok: false, message: error.message});
  }
}

module.exports = {
  checkEndpoint,
  saveEndpoint,
}