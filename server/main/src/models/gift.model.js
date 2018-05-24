const Sequelize = require('sequelize');
// 贡品表
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      url: {
        type: Sequelize.STRING
      },
      imazamoxCount: {
        // 金豆数
        type: Sequelize.INTEGER
      },
      silverBeansCount: {
        // 银豆数
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamps: false
      // freezeTableName: true
    }
  }
}
