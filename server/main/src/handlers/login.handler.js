'use strict';
const services = require('../services')
const debug = require('debug')('main:handler:login');
module.exports = {
  register: function (request, h) {
    debug(request.payload);
    return services.login.register(request.payload.account, request.payload.password, request.payload.name, request.payload.sex, request.payload.age, request.payload.phone, request.payload.country);
  },
  remove: function (request, h) {
    return services.login.remove(request.payload.account);
  },
  resetPassword: function (request, h) {
    return services.login.resetPassword(request.payload.account, request.payload.oldPassword, request.payload.newPassword);
  },
  login: function (req, h) {
    return services.login.login(req.payload.account, req.payload.password);
  },
  imageCode: function (req, h) {
    return services.login.imageCode();
  },
  messageCode: function (req, h) {
    return services.login.messageCode(req.payload.phone)
  }
}
