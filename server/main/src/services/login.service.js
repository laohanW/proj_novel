'use strict';
const sequelize = require('../models').sequelize;
const resCode = require('../core/resCode');
const debug = require('debug')('main:service:login');
const ccap = require('ccap')();
// const utils = require('../core/utils');
module.exports = {
  register: async function (account, password, name, sex, age, phone, country) {
    // let userId = utils.caculateUserId();
    let result = await sequelize.models.user.findOne({
      where: {
        account: account
      }
    });
    if (result) {
      return resCode.dataCreateFailure('account is exists' + account);
    } else {
      let t = await sequelize.transaction();
      try {
        await sequelize.models.user.create({
          account: account,
          password: password,
          name: name,
          sex: sex,
          age: age,
          phone: phone,
          country: country,
          level: 1,
          imazamox: 0,
          silverBeans: 0,
          imazamoxCoupon: 0,
          yCurrency: 0,
          vipId: 1
        });
        // user.setVip(1);
        t.commit();
      } catch (err) {
        t.rollback();
        debug(err);
      }
      return resCode.success();
    }
  },
  remove: async function (account) {
    await sequelize.transaction({autocommit: true});
    let result = await sequelize.models.user.destroy({
      where: {
        account: account
      }
    });
    if (result) {
      return resCode.success(result);
    } else {
      return resCode.dataDestroyFailure('error');
    }
  },
  resetPassword: async function (account, oldPasswprd, newPassword) {
    let result = await sequelize.models.user.findOne({
      where: {
        account: account
      }
    });
    if (result) {
      let pas = result.get('password');
      if (pas === oldPasswprd) {
        await sequelize.transaction({autocommit: true});
        let result = await sequelize.models.user.update({
          password: newPassword
        },
        {
          where: {
            account: account
          }
        });
        if (result) {
          return resCode.success();
        } else {
          return resCode.dataUpdateFailure('result');
        }
      } else {
        return resCode.dataFindFailure();
      }
    } else {
      return resCode.dataFindFailure();
    }
  },
  login: async function (account, password) {
    let user = await sequelize.models.user.findOne({
      where: {
        account: account,
        password: password
      }
    });
    if (user) {
      return resCode.success();
    } else {
      return resCode.dataFindFailure('accout or password is error');
    }
  },
  imageCode: async function () {
    let ary = ccap.get();
    return {
      txt: ary[0],
      buff: ary[1]
    }
  },
  messageCode: async function (phone) {
    return {};
  }
}
