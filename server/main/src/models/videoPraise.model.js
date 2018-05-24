const Sequelize = require('sequelize');
// 视频点赞表
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      videoId: {
        // 视频id
        type: Sequelize.INTEGER
      },
      userId: {
        // 点赞者id
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamps: false
      // freezeTableName: true
    }
  }
}
