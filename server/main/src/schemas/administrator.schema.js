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
          error: {type: 'string'},
          message: {
            type: 'object',
            properties: {
              token: {type: 'string'}
            }
          }
        }
      }
    }
  },
  logout: {
    body: {
      type: 'object',
      properties: {
        username: {type: 'string'}
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
  },
  edit: {
    body: {
      type: 'object',
      properties: {
        username: {type: 'string'},
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
  },
  delete: {
    body: {
      type: 'object',
      properties: {
        username: {type: 'string'}
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
  getList: {
    body: {
      type: 'object',
      properties: {
        limit: {type: 'number'},
        offset: {type: 'number'}
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          code: {type: 'number'},
          error: {type: 'string'},
          message: {
            type: 'object',
            properties: {
              total: {type: 'number'},
              datas: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {type: 'number'},
                    name: {type: 'string'},
                    authorityId: {type: 'number'}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
