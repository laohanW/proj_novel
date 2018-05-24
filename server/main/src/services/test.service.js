'use strict';
const sequelize = require('../models').sequelize;
module.exports = {
  demo1: async function () {
    console.log('demo1');
    return 'demo1';
  },
  demo2: async function () {
    console.log('demo2');
    return 'deme2';
  }
}
