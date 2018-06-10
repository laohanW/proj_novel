'use strict';
const Config = require('config')
const Path = require('path')
module.exports = function (fastify) {
  fastify.register(require('fastify-swagger'), {
    swagger: {
      info: {
        title: 'proj_novel',
        description: 'swagger ui proj_novel',
        version: '0.1.0'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    },
    exposeRoute: true,
    routePrefix: '/documentation'
  })
  let sepuelizeOptions = JSON.parse(JSON.stringify(Config.get('db')))
  sepuelizeOptions.logging = function () {
    return console.log
  }
  fastify.register(require('./sequelize.plugin'), {
    pattern: './*.model.js',
    modelIndex: Path.resolve(__dirname, '../models/index.js'),
    namespace: 'my-ver-own-namespace',
    syncForce: true,
    sequelize: {
      database: Config.get('db.database'),
      username: Config.get('db.username'),
      password: Config.get('db.password'),
      options: sepuelizeOptions
    }
  })
  fastify.register(require('./redis.plugin'), {
    connection: JSON.parse(JSON.stringify(Config.get('redis'))),
    cacheIndex: Path.resolve(__dirname, '../caches/index.js')
  })
  fastify.register(require('./service.plugin'), {
    arr: ['dao', 'schema', 'service', 'handler']
  })
  fastify.register(require('./route.plugin'), {
    pattern: '../routes/*.route.js',
    ignore: []
  })
  fastify.register(require('./jwt.plugin'), {
    secret: function (req, reply, callback) {
      callback(null, Config.get('jwt.secret'))
    }
  })
}
