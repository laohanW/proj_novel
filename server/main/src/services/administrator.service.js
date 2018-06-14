const caches = require('../caches')
const models = require('../models')
const Debug = require('debug')('services:administrator')
module.exports = {
  verifyLogin: async function (username, password) {
    const result = await models.administrator.getUser(username)
    Debug(result)
    return result
  },
  create: async function (username, password, authorityId) {
    const result = await models.administrator.create(username, password, authorityId)
    Debug(result)
    return result
  },
  setToken: async function (userName, password, token) {
    caches.administrator.setToken(1, token)
  }
}
