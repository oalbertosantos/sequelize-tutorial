const NodeCache = require('node-cache');

// Instância do cache com tempo padrão de 60 segundos
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

module.exports = {
  get: (key) => cache.get(key),
  set: (key, value, ttl) => cache.set(key, value, ttl || 60),
  del: (key) => cache.del(key),
  flush: () => cache.flushAll(),
};
