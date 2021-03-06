'use strict';
const fastify = require('fastify')({
  logger: false
})
const Debug = require('debug')
const Config = require('config')
const debug = Debug('main:app')
Debug.enable(Config.get('debug'));
const plugins = require('./plugins');
plugins(fastify)
fastify.ready(function () {
  // console.log(fastify.printRoutes())
  debug('ready')
  fastify.listen(3000, function (err) {
    if (err) {
      throw err
    } else {
      debug(`listening on ${fastify.server.address().address} :${fastify.server.address().port}`)
    }
  })
})
