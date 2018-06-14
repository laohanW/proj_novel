
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
      password: {
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
  ],
  methods: {
    getUser: async function (username) {
      await this.sequelize.transaction()
      return this.sequelize.models.administrator.findAll({
        where: {
          name: username
        }
      })
    },
    create: async function (username, password, authorityId) {
      await this.sequelize.transaction();
      return await this.sequelize.models.administrator.create({
        name: username,
        password: password,
        authorityId: authorityId
      })
    }
  }
}
