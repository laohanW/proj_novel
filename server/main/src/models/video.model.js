const Sequelize = require('sequelize');
// 视频表
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      shareCount: {
        type: Sequelize.INTEGER,
        default: 0
      },
      leavingMsgId: {
        // 留言表id
        type: Sequelize.INTEGER
      },
      praiseId: {
        // 点赞表id
        type: Sequelize.INTEGER
      }
    },
    options: {
      timestamps: false,
      createdAt: true
      // freezeTableName: true
    }
  },
  associate: [
    {
      type: 'belongsToMany',
      to: 'user',
      options: {
        through: 'userVideos',
        foreignKey: 'videoId'
      }
    },
    {
      type: 'hasMany',
      to: 'videoLeavingMsg',
      options: {
        foreignKey: {
          name: 'videoId'
        }
      }
    },
    {
      type: 'hasMany',
      to: 'videoPraise',
      options: {
        foreignKey: {
          name: 'videoId'
        }
      }
    }
  ]
}
