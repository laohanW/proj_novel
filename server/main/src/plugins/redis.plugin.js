'use strict'
const redis = require('redis');
const redisClientFactory = require('basic-redis-factory');
module.exports = function (server, options, next) {
  const redisClient = redisClientFactory(redis, options.connection);
  let initalErrorHandler = function (err) {
    server.log.info(err.message);
    redisClient.end();
  };
  redisClient.on('error', initalErrorHandler);
  redisClient.on('ready', function () {
    redisClient.removeListener('error', initalErrorHandler);
    redisClient.on('error', function (err) {
      server.log(err.message);
    });
  })
  require(options.cacheIndex).initialize(redisClient);
  server.decorate('$redis', redisClient);
  next()
}
