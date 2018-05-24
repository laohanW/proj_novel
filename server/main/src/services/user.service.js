'use strict';
const sequelize = require('../models').sequelize;
const resCode = require('../core/resCode');
const debug = require('debug')('service:user');
// const utils = require('../core/utils');
module.exports = {
  detailInfo: async function (account) {
    let userInfo = await sequelize.models.user.findOne({
      where: {
        account: account
      }
    });
    if (userInfo) {
      return resCode.success(userInfo.toJSON());
    } else {
      return resCode.dataFindFailure('dont has this account=>' + account);
    }
  },
  detailPayment: async function (userId) {
    let userInfo = await sequelize.models.userPayment.findAll({
      where: {
        userId: userId
      }
    });
    if (userInfo) {
      return resCode.success(JSON.stringify(userInfo));
    } else {
      return resCode.dataFindFailure('dont has this userId=>' + userId);
    }
  },
  weekLeaderboards: async function (userId) {
    await sequelize.models.fans.findAll({
      attributes: [
        [sequelize.literal('distinct ``'), '']
      ],
      where: {
        userId: userId
      }

    });
  }
}
