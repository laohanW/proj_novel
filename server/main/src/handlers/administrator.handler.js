const services = require('../services')
// const models = require('../models')
module.exports = {
  beforeLogin: async function (req, reply, next) {
    const result = await services.administrator.verifyLogin()
    reply.jwtSign(req.body, function (err, token) {
      if (err) {
        reply.send({
          code: 3000,
          error: err
        })
      } else {
        services.administrator.SetToken()
        reply.token = token
        next()
      }
    })
  },
  login: async function (req, reply) {
    req.log.info('base.handler')
    reply.send({code: 20000})
  },
  beforeCreate: async function (req, reply) {
    // TODO:add token verify
  },
  create: async function (req, reply) {
    const result = await services.administrator.create(req.body.username, req.body.password, req.body.authorityId)
    reply.send({code: 20000})
  }
}
