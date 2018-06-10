'use strict'
const redis = require('redis');
const Glob = require('glob')
const Path = require('path')
const redisClientFactory = require('basic-redis-factory');
module.exports = function (server, options, next) {
  const redisClient = redisClientFactory(redis, options.connection);
  let initalErrorHandler = function (err) {
    server.log.info(err.message);
    redisClient.end();
    next()
  };
  redisClient.on('error', initalErrorHandler);
  redisClient.on('ready', async function () {
    redisClient.removeListener('error', initalErrorHandler);

    let value = 'cache'
    let globtions = {
      nodir: true,
      strict: true,
      ignore: [],
      cwd: Path.resolve(__dirname, '../' + value + 's/')
    }
    let req = require('../' + value + 's/')
    let matches = await Glob.sync('./*.' + value + '.js', globtions);
    matches.forEach(match => {
      let load = require(Path.resolve(globtions.cwd, match));
      let conHandlerName = Path.basename(match, Path.extname(match));
      let handlerName = Path.basename(conHandlerName, Path.extname(conHandlerName));
      let cls = load.default || load;
      req[handlerName] = cls;
      console.log(value, cls)
      cls['redis'] = redisClient
      cls['name'] = handlerName
    });
    redisClient.on('error', function (err) {
      server.log(err.message);
    });
    next()
  })
}
