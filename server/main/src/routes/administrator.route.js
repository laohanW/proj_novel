const handlers = require('../handlers')
const schemas = require('../schemas')
module.exports = [
  {
    method: 'POST',
    url: '/administrator/login',
    schema: schemas.administrator.login,
    beforeHandler: handlers.administrator.beforeLogin,
    handler: handlers.administrator.login
  },
  {
    method: 'POST',
    url: '/administrator/create',
    schema: schemas.administrator.create,
    beforeHandler: handlers.administrator.beforeCreate,
    handler: handlers.administrator.create
  },
  {
    method: 'POST',
    url: '/administrator/logout',
    schema: schemas.base.test,
    beforeHandler: handlers.base.beforeTest,
    handler: handlers.base.test
  }
]
