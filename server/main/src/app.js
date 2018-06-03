'use strict';
const fastify = require('fastify')()
// const Debug = require('debug')
// const Config = require('config')
// const debug=Debug('main:app')
const plugins = require('./plugins');
plugins(fastify)
fastify.ready(function () {
  console.log(fastify.printRoutes())
  fastify.listen(3000, function (err) {
    if (err) throw err
    console.log(`listening on ${fastify.server.address().address} :${fastify.server.address().port}`)
  })
})
