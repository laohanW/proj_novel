module.exports = function (req, reply) {
  req.log.info('base.handler')
  reply.send({hello: 'wolrd'})
}
