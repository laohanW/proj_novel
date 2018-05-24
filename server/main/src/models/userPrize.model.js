const Sequelize = require('sequelize');
// 用户奖品表
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER
      },
      prizeId: {
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamps: true
      // freezeTableName: true
    }
  },
  associate: [
    {
      type: 'belongsTo',
      to: 'user',
      options: {
        foreignKey: 'userId'
      }
    },
    {
      type: 'belongsTo',
      to: 'prize',
      options: {
        foreignKey: 'prizeId'
      }
    }
  ]
}
