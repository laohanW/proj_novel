
const Sequelize = require('sequelize');
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      name: {
        type: Sequelize.STRING
      },
      authorityId: {
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
      type: 'hasOne',
      to: 'administrator_authority'
    }
  ]
}
