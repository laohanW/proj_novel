'use strict'
const redis = require('redis');
const redisClientFactory = require('basic-redis-factory');
exports.plugin = {
  register: async function (server, options) {
    const redisClient = redisClientFactory(redis, options.connection);
    let initalErrorHandler = function (err) {
      server.log([ 'redis-plugin', 'error' ], err.message);
      redisClient.end();
    };
    redisClient.on('error', initalErrorHandler);
    redisClient.on('ready', function () {
      redisClient.removeListener('error', initalErrorHandler);
      redisClient.on('error', function (err) {
        server.log([ 'redis-plugin', 'error' ], err.message);
      });
    })
    require(options.cacheIndex).initialize(redisClient);
    server.expose('redis', redisClient);
  },
  name: 'redis-plugin'
}
