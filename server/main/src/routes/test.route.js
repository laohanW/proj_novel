const handlers = require('../handlers')
module.exports = [
  {
    method: 'GET',
    url: '/test',
    schema: {
      querystring: {
        name: {type: 'string'}
      },
      response: {
        200: {
          type: 'object',
          properties: {
            hello: {type: 'string'}
          }
        }
      }
    },
    beforeHandler: function (req, reply, next) {
      req.log.info('info')
      console.log(req.body)
      console.log('before')
      next()
    },
    handler: handlers.base
  },
  {
    method: 'POST',
    url: '/testJwt',
    schema: {
      body: {
        payload: {
          type: 'string',
          properties: {
            username: 'string'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: {type: 'string'}
          }
        }
      }
    },
    beforeHandler: function (req, reply, next) {
      req.log.info('info')
      console.log('before')
      console.log(req.body)
      reply.jwtSign(req.body.payload, function (err, token) {
        console.log(err)
        console.log(token)
        return reply.send(err || {'token': token})
      })
      console.log('before')
    },
    handler: handlers.base
  }
]
