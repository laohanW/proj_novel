const Sequelize = require('sequelize');
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      childCategoryId: {
        type: Sequelize.INTEGER
      },
      roomId: {
        type: Sequelize.INTEGER
      },
      rtmp: {
        type: Sequelize.STRING
      },
      snapshotUrl: {
        type: Sequelize.STRING
      }
    },
    options: {
      timestamps: true
    }
  },
  associate: [
    {
      type: 'belongsTo',
      to: 'category',
      options: {
        foreignKey: 'categoryId'
      }
    },
    {
      type: 'belongsTo',
      to: 'childCategory',
      options: {
        foreignKey: 'childCategoryId'
      }
    }
  ]
}
