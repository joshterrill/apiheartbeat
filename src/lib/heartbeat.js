const request = require('async-request');
module.exports = {
  checkHeartbeat: async (endpoint) => {
    const options = {
      headers: {
        referrer: 'https://apiheartbeat.com',
      },
    };
    const heartbeat = await request(endpoint.url, options);
    if (heartbeat && heartbeat.statusCode === endpoint.statusCode) {
      return {ok: true, message: 'Success'};
    } else if (heartbeat.body && heartbeat.statusCode !== endpoint.statusCode) {
      return {ok: true, message: `Endpoint returned with body but status code ${heartbeat.statusCode} does not match ${endpoint.statusCode}`};
    } else if (!heartbeat || !heartbeat.body || heartbeat.error) {
      return {ok: false, message: heartbeat.error};
    }
  },
}
