const Config = require('config');
const debug = require('debug')('main:auth');
module.exports = async function (server) {
  server.auth.strategy('jwt', 'jwt', {
    key: Config.get('auth.key'),
    verifyOptions: {
      ignoreExpiration: Config.get('auth.verifyOptions.ignoreExpiration')
    },
    validateFunc: function (decoded, request, callback) {
      server.redis.hget('appAuth', function (err, h) {
        if (err) {
          debug(err);
          return;
        }
        debug(h);
        callback(err, true);
      });
    }
  })
};
