'use strict';
const sequelize = require('../models').sequelize;
const resCode = require('../core/resCode');
module.exports = {
  list: async function () {
    let result = sequelize.models.gift.findAll();
    return resCode.success(result.toJSON());
  },
  give: async function (userId, targetId, giftId) {
    let gift = sequelize.models.gift.findOne({
      where: {
        id: giftId
      }
    });
    if (gift) {
      let t = await sequelize.transaction();
      try {
        let user = sequelize.models.user.findOne({
          where: {
            id: userId
          }
        });
        user.increment({imazamox: gift.imazamoxCount, silverBeans: gift.silverBeansCount});
        t.commit();
        return resCode.success();
      } catch (err) {
        t.rollback();
        return resCode.dataUpdateFailure();
      }
    } else {
      return resCode.dataFindFailure('dont has this giftId=' + gift);
    }
  }
}
