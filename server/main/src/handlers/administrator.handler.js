const caches = require('../caches')
// const models = require('../models')
module.exports = {
  beforeLogin: function (req, reply, next) {
    reply.jwtSign(req.body.payload, function (err, token) {
      if (err)reply.send(err)
      else {
        caches.administrator.setToken(1, token)
        reply.token = token
        next()
      }
    })
  },
  login: function (req, reply) {
    req.log.info('base.handler')
    reply.send({hello: 'wolrd'})
  }
}
