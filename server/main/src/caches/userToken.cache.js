
module.exports = {
  getUserId: async function () {

  },
  setToken: async function (userId, token) {
    return await this.redis.hmset(this.name, [userId, token]);
  }
}
