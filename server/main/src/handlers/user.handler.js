'use strict';
const services = require('../services')
module.exports = {
  detailInfo: function (req, h) {
    return services.user.detailInfo(req.payload.account);
  },
  infoInLiveStream: function (req, h) {
    return services.user.infoInLiveStream(req.payload.streamId);
  }
}
