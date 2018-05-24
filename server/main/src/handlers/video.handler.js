'use strict';
const services = require('../services')
module.exports = {
  upload: function (request, h) {
    return services.base();
  }
}
