const handlers = require('../handlers')
const schemas = require('../schemas')
module.exports = [
  {
    method: 'GET',
    url: '/test',
    schema: schemas.base.test,
    handler: handlers.base.test
  },
  {
    method: 'POST',
    url: '/testJwt',
    schema: schemas.base.test,
    beforeHandler: handlers.base.beforeTest,
    handler: handlers.base.test
  }
]
