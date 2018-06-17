const caches = require('../caches')
const models = require('../models')
const Debug = require('debug')('services:administrator')
module.exports = {
  verifyLogin: async function (username, password) {
    return await models.administrator.verifyLogin(username, password)
  },
  hasUser: async function (username) {
    return await models.administrator.getUser(username)
  },
  create: async function (username, password, authorityId) {
    Debug('create', username + '   ' + password + '   ' + authorityId)
    return await models.administrator.create(username, password, authorityId)
  },
  edit: async function (username, authorityId) {
    return await models.administrator.updateAuthorityId(username, authorityId)
  },
  delete: async function (username) {
    return await models.administrator.delete(username)
  },
  getList: async function (limit, offset) {
    const count = await models.administrator.count()
    const result = await models.administrator.getList(limit, offset)
    let data = []
    result.forEach((ele, index) => {
      data.push({
        id: index + 1,
        name: ele.dataValues.name,
        authorityId: ele.dataValues.authorityId
      })
    });
    return {
      total: count,
      datas: data
    }
  },
  setToken: async function (username, token) {
    const user = await models.administrator.getUser(username)
    caches.administrator.setToken(user.dataValues.id, token)
  },
  deleteToken: async function (username, token) {
    const user = await models.administrator.getUser(username)
    try {
      caches.administrator.deleteToken(user.dataValues.id)
      return true
    } catch (err) {
      Debug('deleteToken', err)
      return false
    }
  }
}
