const services = require('../services')
const Debug = require('debug')('handler:administrator')
// const models = require('../models')
module.exports = {
  beforeLogin: async function (req, reply, next) {
    const result = await services.administrator.verifyLogin(req.body.username, req.body.password)
    if (!result) {
      reply.send({
        code: 3000,
        error: 'invalid username or password'
      })
    }
  },
  login: async function (req, reply) {
    Debug('login', req.body)
    reply.jwtSign(req.body, async function (err, token) {
      Debug('jwtSign')
      if (err) {
        reply.send({
          code: 3000,
          error: err
        })
      } else {
        await services.administrator.setToken(req.body.username, token)
        reply.send({
          code: 20000,
          message: {
            token: token
          }
        })
      }
    })
    // req.jwtVerify(function (err, decoded) {
    //   if (err) {
    //     reply.send({
    //       code: 3000,
    //       error: err
    //     })
    //   } else {

    //   }
    // })
    // req.log.info('base.handler')
  },
  logout: async function (req, reply) {
    const result = await services.administrator.deleteToken(req.body.username)
    if (result) {
      reply.send({code: 20000})
    } else {
      reply.send({
        code: 30000,
        error: 'logout error'
      })
    }
  },
  beforeCreate: async function (req, reply) {
    // TODO:add token verify
    const has = await services.administrator.hasUser(req.body.username)
    if (has) {
      reply.send({
        code: 3000,
        error: 'has this username'
      })
    }
  },
  create: async function (req, reply) {
    Debug('Create')
    await services.administrator.create(req.body.username, req.body.password, req.body.authorityId)
    reply.send({code: 20000})
  },
  beforeEdit: async function (req, reply) {
    const has = await services.administrator.hasUser(req.body.username)
    Debug('beforeEdit', has)
    if (!has) {
      reply.send({
        code: 3000,
        error: 'dont has this username'
      })
    }
  },
  edit: async function (req, reply) {
    await services.administrator.edit(req.body.username, req.body.authorityId)
    reply.send({code: 20000})
  },
  delete: async function (req, reply) {
    await services.administrator.delete(req.body.username)
    reply.send({code: 20000})
  },
  getList: async function (req, reply) {
    Debug('getList')
    const result = await services.administrator.getList(req.body.limit, req.body.offset)
    Debug(result)
    reply.send(
      {
        code: 20000,
        message: result
      }
    )
  }
}
