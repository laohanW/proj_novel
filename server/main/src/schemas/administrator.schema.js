module.exports = {
  login: {
    body: {
      type: 'object',
      properties: {
        username: {type: 'string'},
        password: {type: 'string'}
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          code: {type: 'number'},
          error: {type: 'string'}
        }
      }
    }
  },
  create: {
    body: {
      type: 'object',
      properties: {
        username: {type: 'string'},
        password: {type: 'string'},
        authorityId: {type: 'number'}
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          code: {type: 'number'},
          error: {type: 'string'}
        }
      }
    }

  }
}
