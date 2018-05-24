const Sequelize = require('sequelize');
module.exports = {
  model: {
    table: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      account: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      headPortraitUrl: {
        // 头像
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.BIGINT(1),
        allowNull: false,
        defaultValue: 1
      },
      age: {
        type: Sequelize.BIGINT(8),
        allowNull: false,
        defaultValue: 19870505
      },
      phone: {
        type: Sequelize.BIGINT(11),
        allowNull: true
      },
      country: {
        // 城市
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      autgoraph: {
        // 签名
        type: Sequelize.STRING,
        allowNull: true
      },
      level: {
        type: Sequelize.BIGINT(3),
        allowNull: false,
        defaultValue: 1
      },
      imazamox: {
        // 金豆
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      silverBeans: {
        // 银豆
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      imazamoxCoupon: {
        // 金豆卷
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      yCurrency: {
        // Y币
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      vipId: {
        type: Sequelize.BIGINT(3),
        allowNull: false,
        defaultValue: 0
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
      to: 'vip',
      options: {
        foreignKey: 'vipId'
      }
    },
    {
      type: 'hasMany',
      to: 'userPrize',
      options: {
        foreignKey: 'userId'
      }
    },
    {
      type: 'hasMany',
      to: 'userPayment',
      options: {
        foreignKey: 'userId'
      }
    },
    {
      type: 'belongsToMany',
      to: 'video',
      options: {
        through: 'userVideos',
        foreignKey: 'userId',
        constraints: false
      }
    },
    {
      type: 'hasOne',
      to: 'fans',
      options: {
        foreignKey: 'userId',
        constraints: false
      }
    },
    {
      type: 'hasOne',
      to: 'subscriber',
      options: {
        foreignKey: 'userId',
        constraints: false
      }
    },
    {
      type: 'hasOne',
      to: 'liveStream',
      options: {
        foreignKey: 'userId'
      }
    },
    {
      type: 'belongsToMany',
      to: 'fans',
      options: {
        through: 'userFans',
        foreignKey: 'userId'
      }
    },
    {
      type: 'belongsToMany',
      to: 'subscriber',
      options: {
        through: 'userSubscribers',
        foreignKey: 'userId',
        constraints: false
      }
    }
  ]
}
