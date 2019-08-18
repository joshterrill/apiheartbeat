const db = require('./util/db');
const uuidv1 = require('uuid/v1');

module.exports = {
  addSource: async (source) => {
    let sources = await db.get('sources');
    console.log('sources in add source', sources);
    if (!sources) {
      source.id = uuidv1();
      return await db.put('sources', [source]);
    }
    const alreadyExists = sources.find(item => item.url === source.url);
    if (alreadyExists) throw new Error('This URL already exists');
    source.id = uuidv1();
    sources = sources.push(source);
    return await db.put('sources', sources);
  },
  updateSource: async (source) => {
    let sources = await db.get('sources');
    const foundIndex = sources.findIndex(item => item.id === source.id);
    if (foundIndex === -1) throw new Error('Unable to find URL');
    sources[foundIndex] = source;
    return await db.put('sources', sources);
  },
  getAll: async (key) => {
    return await db.get(key);
  },
}


