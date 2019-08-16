const db = require('./util/db');


const source = {
  url: 'https://localhost:3001/',
  frequency: 60 * 1000, // 60 seconds
  timeTilNextRequest: new Date(new Date().getTime() + (60 * 1000)), // now() + frequency
  expectedStatusCode: 200,
  expectedResponse: {},
};

console.log(source);


module.exports = {
  addSource: async (source) => {
    let sources = await db.get('sources');
    sources = sources.push(source);
    return await db.put('sources', sources);
  },
}


