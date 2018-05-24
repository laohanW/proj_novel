const Sequelize = require('sequelize');
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      userId: {
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
      type: 'belongsToMany',
      to: 'user',
      options: {
        through: 'userSubscribers',
        foreignKey: 'subscriberId'
      }
    }
  ]
}
