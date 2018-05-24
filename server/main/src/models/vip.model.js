const Sequelize = require('sequelize');
// vip贵族表
module.exports = {
  model: {
    table: {
      id: {
        // 视频id
        type: Sequelize.Sequelize.BIGINT(3),
        primaryKey: true,
        autoIncrement: true
      },
      imageUrl: {
        // 图像
        type: Sequelize.STRING,
        allowNull: false
      },
      miniIcon: {
        // 图标头像
        type: Sequelize.STRING,
        allowNull: false
      },
      money: {
        // 价值（）钱
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    options: {
      timestamps: false
      // freezeTableName: true
    }
  }
}
