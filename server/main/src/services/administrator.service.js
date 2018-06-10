const daos = require('../daos')
module.exports = {
  setToken: function (userName, password, token) {
    daos.administrator.setToken(1, token)
  }
}
