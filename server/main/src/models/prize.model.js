const Sequelize = require('sequelize');
// 奖品
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      type: {
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamps: false
      // freezeTableName: true
    }
  }
}
