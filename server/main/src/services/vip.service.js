'use strict';
const sequelize = require('../models').sequelize;
const debug = require('debug')('main:service:vip');
const resCode = require('../core/resCode');
const caches = require('../caches').caches;
module.exports = {
  add: async function (imageUrl, miniIcon, money) {
    let t = await sequelize.transaction();
    try {
      await caches.userToken.setToken(1, 'asdwasd');
      await sequelize.models.vip.create({
        imageUrl: imageUrl,
        miniIcon: miniIcon,
        money: money
      });
      t.commit();
    } catch (err) {
      t.rollback();
      debug(err);
    }
    return resCode.success();
  },
  remove: async function (id) {
    let vip = await sequelize.models.vip.findOne({
      where: {
        id: id
      }
    });
    if (vip) {
      let t = await sequelize.transaction();
      try {
        await vip.destroy();
        t.commit();
        return resCode.success();
      } catch (err) {
        t.rollback();
        return resCode.dataDestroyFailure();
      }
    } else {
      return resCode.dataFindFailure('dont has this vip id=' + id);
    }
  },
  modify: async function (id, imageUrl, miniIcon, money) {
    let vip = await sequelize.models.vip.findOne({
      where: {
        id: id
      }
    })
    if (vip) {
      let t = await sequelize.transaction();
      try {
        vip.update({
          imageUrl: imageUrl,
          miniIcon: miniIcon,
          money: money
        });
        t.commit();
        return resCode.success()
      } catch (err) {
        t.rollback();
        return resCode.dataUpdateFailure();
      }
    } else {
      return resCode.dataFindFailure('dont has this vip id=' + id);
    }
  }
}
