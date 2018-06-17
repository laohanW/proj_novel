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
    url: '/administrator/logout',
    schema: schemas.administrator.logout,
    handler: handlers.administrator.logout
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
    url: '/administrator/edit',
    schema: schemas.administrator.edit,
    handler: handlers.administrator.edit
  },
  {
    method: 'POST',
    url: '/administrator/delete',
    schema: schemas.administrator.delete,
    handler: handlers.administrator.delete
  },
  {
    method: 'POST',
    url: '/administrator/getList',
    schema: schemas.administrator.getList,
    handler: handlers.administrator.getList
  }
]
