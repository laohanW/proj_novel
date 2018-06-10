const caches = require('../caches')
module.exports = {
  setToken: function (userId, token) {
    caches.administrator.setToken(1, token)
  }
}
