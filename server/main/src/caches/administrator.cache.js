
module.exports = {
  getUserId: async function (userId) {
    return await this.redis.hget(this.name, userId)
  },
  setToken: async function (userId, token) {
    return await this.redis.hmset(this.name, [userId, token]);
  },
  deleteToken: async function (userId) {
    return await this.redis.hdel(this.name, userId)
  }
}
