'use strict';
const services = require('../services')
module.exports = {
  list: function (request, h) {
    return services.gift.list();
  },
  give: function (request, h) {
    return services.gift.give(request.payload.userId, request.payload.targetId, request.payload.giftId);
  }
}
