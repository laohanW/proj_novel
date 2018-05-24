'use strict';
const Debug = require('debug');
const Hapi = require('hapi');
const Config = require('config');
const debug = Debug('main:app');
if (Config.get('profile')) {
  require('newrelic');
}
Debug.enable(Config.get('debug'));
const auth = require('./auth');
const plugins = require('./plugins');
async function start () {
  const connectionConfig = Config.get('server');
  const server = new Hapi.Server(JSON.parse(JSON.stringify(connectionConfig)));
  await plugins(server);
  await auth(server);
  server.start();
  debug('api server running at:' + server.info.uri);
}
start();
