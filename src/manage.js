const heartbeat = require('./index');
const db = require('./util/db');

const source = {
  id: null,
  url: 'https://localhost:3000/',
  frequency: 60 * 1000, // 60 seconds
  timeTilNextRequest: new Date(new Date().getTime() + (60 * 1000)), // now() + frequency
  expectedStatusCode: 200,
  expectedResponse: {},
  errors: [],
};


(async () => {


  const addedSource = await heartbeat.addSource(source);

  console.log('addedSource', addedSource);


  const all = await heartbeat.getAll('sources');

  console.log(all);

})();
