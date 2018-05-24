const Sequelize = require('sequelize');
// 粉丝关系表
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    },
    options: {
      timestamps: false
      // freezeTableName: true
    }
  },
  associate: [
    {
      type: 'belongsToMany',
      to: 'user',
      options: {
        through: 'userFans',
        foreignKey: 'fansId'
      }
    },
    {
      type: 'hasMany',
      to: 'fansGift',
      options: {
        foreignKey: 'fansId'
      }
    }
  ]
}
