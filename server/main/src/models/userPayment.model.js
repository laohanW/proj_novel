const Sequelize = require('sequelize');
// 用户支付明细
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      money: {
        type: Sequelize.INTEGER
      },
      type: {
        // 1:支付   2:收入
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamps: false
    }
  }
}
