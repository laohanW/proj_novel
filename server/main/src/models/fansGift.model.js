const Sequelize = require('sequelize');
// 粉丝送礼品表
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      fansId: {
        type: Sequelize.INTEGER
      },
      followedId: {
        type: Sequelize.INTEGER
      },
      giftId: {
        type: Sequelize.INTEGER
      },
      giftCount: {
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamps: false
      // freezeTableName: true
    }
  },
  associate: [
    {
      type: 'belongsTo',
      to: 'gift',
      options: {
        foreignKey: 'giftId'
      }
    },
    {
      type: 'belongsTo',
      to: 'user',
      options: {
        foreignKey: 'followedId'
      }
    }
  ]
}
