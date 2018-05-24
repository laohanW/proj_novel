'use strict';
// const sequelize = require('../models').sequelize;
const resCode = require('../core/resCode')
module.exports = {
  recomContent: async function (type) {
    return resCode.success();
  },
  childRecomContent: async function (categoryId) {
    return resCode.success();
  }
}
