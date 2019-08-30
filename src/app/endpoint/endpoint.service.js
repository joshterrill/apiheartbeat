const heartbeat = require('../../lib/heartbeat');

module.exports = {
  checkEndpoint: async (req, res, next) => {
    const endpoint = req.body;
    try {
      const heartbeatRes = await heartbeat.checkHeartbeat(endpoint);
      res.json(heartbeatRes);
    } catch (error) {
      res.json({ok: false, status: 'error', message: error.message});
    }
  },
  saveEndpoint: async (req, res, next) => {
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
  },
}