module.exports = {
  beforeTest: function (req, reply, next) {
    reply.jwtSign(req.body, function (err, token) {
      if (err)reply.send(err)
      else {
        reply.token = token
        next()
      }
    })
  },
  test: function (req, reply) {
    req.log.info('base.handler')
    reply.send({hello: 'wolrd'})
  }
}
