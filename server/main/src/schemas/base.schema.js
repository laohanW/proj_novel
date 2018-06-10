module.exports = {
  test: {
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
}
