'use strict';
const Config = require('config');
const Path = require('path');
module.exports = async (server) => {
  let plugins = [];
  if (Config.get('env') === 'development') {
    plugins = [
      require('inert'),
      require('vision'),
      {
        plugin: require('hapi-swagger'),
        options: {
          info: {
            title: 'Liveplayer API Documentation',
            version: require('../../package').version,
            contact: {
              name: 'laohan',
              email: '369016334@qq.com'
            }
          },
          schemes: ['http', 'https'],
          host: Config.get('server.host') + ':' + Config.get('server.port'),
          cors: Config.get('server.routes.cors')
        }
      },
      {
        plugin: require('./good'),
        options: {
          // ops: {
          //     interval: 1000
          // },
          reporters: {
            myConsoleReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ],
            myFileReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ ops: '*' }]
              },
              {
                module: 'good-squeeze',
                name: 'SafeJson'
              }
              // {
              //     module: 'good-file',
              //     args: ['./test/fixtures/awesome_log']
              // }
            ],
            myHTTPReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ error: '*' }]
              },
              {
                module: 'good-http',
                args: ['http://prod.logs:3000', {
                  wreck: {
                    headers: { 'x-api-key': 12345 }
                  }
                }]
              }
            ]
          }
        }
      }
    ]
  }
  plugins.push({
    plugin: require('./sequelize.plugin'),
    options: {
      pattern: './*.model.js',
      modelIndex: Path.resolve(__dirname, '../models/index.js'),
      namespace: 'my-ver-own-namespace',
      syncForce: true,
      sequelize: {
        database: Config.get('db.database'),
        username: Config.get('db.username'),
        password: Config.get('db.password'),
        options: JSON.parse(JSON.stringify(Config.get('db')))
      }
    }
  });
  plugins.push({
    plugin: require('./routes.plugin'),
    options: {
      includes: ['src/routes/*.route.js']
    }
  });
  plugins.push({
    plugin: require('./redis.plugin'),
    options: {
      connection: JSON.parse(JSON.stringify(Config.get('redis'))),
      cacheIndex: Path.resolve(__dirname, '../caches/index.js')
    }
  });
  await server.register(plugins);
};
