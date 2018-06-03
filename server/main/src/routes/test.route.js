const handlers = require('../handlers')
const schema = {
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
}
module.exports = {
  name: 'test',
  version: '1.0.0',
  path: '/test',
  schema: schema,
  method: 'get',
  handler: handlers.base
}
