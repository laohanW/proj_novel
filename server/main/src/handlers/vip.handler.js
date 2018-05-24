'use strict';
const services = require('../services')
module.exports = {
  add: function (request, h) {
    return services.vip.add(request.payload.imageUrl, request.payload.miniIcon, request.payload.money);
  },
  remove: function (request, h) {
    return services.vip.remove(request.payload.id);
  },
  modify: function (request, h) {
    return services.vip.modify(request.payload.id, request.payload.imageUrl, request.payload.miniIcon, request.payload.money);
  }
}
