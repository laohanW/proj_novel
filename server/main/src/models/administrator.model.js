
const Sequelize = require('sequelize');
const Debug = require('debug')('model:administrator')
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
    verifyLogin: async function (username, password) {
      Debug('verifyLogin', ...arguments)
      const t = await this.sequelize.transaction()
      try {
        const result = await this.sequelize.models.administrator.findOne({
          where: {
            name: username,
            password: password
          },
          transaction: t
        })
        Debug(result)
        t.commit()
        return result
      } catch (err) {
        t.rollback()
        Debug('getUser', 'getUser error:' + err)
        return null
      }
    },
    getUser: async function (username) {
      Debug('getUser', ...arguments)
      const t = await this.sequelize.transaction();
      try {
        const result = await this.sequelize.models.administrator.findOne({
          where: {
            name: username
          },
          transaction: t
        })
        t.commit()
        return result
      } catch (err) {
        t.rollback()
        Debug('getUser', 'getUser error:' + err)
        return null
      }
    },
    create: async function (username, password, authorityId) {
      Debug('create', ...arguments)
      const t = await this.sequelize.transaction();
      try {
        const result = await this.sequelize.models.administrator.create({
          name: username,
          password: password,
          authorityId: authorityId
        }, {transaction: t})
        t.commit()
        return result
      } catch (err) {
        t.rollback()
        Debug('create', 'create error:' + err)
        return undefined
      }
    },
    updateAuthorityId: async function (username, authorityId) {
      Debug('updateAuthorityId', ...arguments)
      const t = await this.sequelize.transaction()
      try {
        const result = await this.sequelize.models.administrator.update(
          {
            authorityId: authorityId
          },
          {
            where: {
              name: username
            },
            transaction: t
          })
        t.commit()
        return result
      } catch (err) {
        t.rollback()
        return null
      }
    },
    delete: async function (username) {
      Debug('delete', ...arguments)
      const t = await this.sequelize.transaction();
      try {
        const result = await this.sequelize.models.administrator.destroy({
          where: {
            name: username
          },
          transaction: t
        })
        t.commit()
        return result
      } catch (err) {
        t.rollback()
        return null
      }
    },
    getList: async function (limit, offset) {
      Debug('getList', ...arguments)
      const t = await this.sequelize.transaction();
      try {
        const result = await this.sequelize.models.administrator.findAll({
          limit: limit,
          offset: offset,
          attributes: ['name', 'authorityId'],
          transaction: t
        })
        t.commit()
        return result
      } catch (err) {
        t.rollback()
        Debug('getList', err)
        return null
      }
    },
    count: async function () {
      Debug('count')
      const t = await this.sequelize.transaction();
      try {
        const result = await this.sequelize.models.administrator.count()
        t.commit();
        return result
      } catch (err) {
        t.rollback();
        return 0
      }
    }
  }
}
