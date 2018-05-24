'use strict';
const sequelize = require('../models').sequelize;
const resCode = require('../core/resCode');
const debug = require('debug')('main:service:liveStream');
const Op = require('sequelize').Op;
module.exports = {
  start: async function (title, rtmp, categoryId, childCategoryId, userId) {
    const user = await sequelize.models.user.findOne({
      where: {
        id: userId
      }
    });
    if (user) {
      debug(await user.getLiveStream())
      if (await user.getLiveStream()) {
        return resCode.dataCreateFailure('user is living ' + userId);
      } else {
        let liveStream = await sequelize.models.liveStream.build({
          categoryId: categoryId,
          childCategoryId: childCategoryId
        })
        await user.setLiveStream(liveStream);
        return resCode.success();
      }
    } else {
      return resCode.dataFindFailure('dont has this userId=' + userId);
    }
  },
  cancel: async function (streamId, account) {
    await sequelize.transaction();
    let result = await sequelize.models.liveStream.destroy({
      where: {
        id: streamId,
        account: account
      }
    });
    if (result > 0) {
      return resCode.success();
    } else {
      return resCode.dataDestroyFailure();
    }
  },
  list: async function (childCategoryId) {
    let liveStream = await sequelize.models.liveStream.findAll({
      where: {
        childCategoryId: childCategoryId
      }
    });
    if (liveStream) {
      return resCode.success(liveStream.toJSON());
    } else {
      return resCode.dataFindFailure();
    }
  },
  userInfo: async function (streamId) {
    let stream = await sequelize.models.liveStream.findOne({
      where: {
        streamId: streamId
      },
      include: [
        {
          model: sequelize.models.user,
          include: [
            {
              model: sequelize.models.video,
              include: [
                {
                  model: sequelize.models.videoLeavingMsg
                }
              ],
              order: ['createTime', 'DESC'],
              limit: 1
            }
          ]
        }
      ]
    });
    if (stream) {
      console.log(stream);
      let relateVideo = await sequelize.models.video.findAll({
        where: {
          title: {
            [Op.like]: stream.title
          }
        },
        limit: 10
      })
      return resCode.success({
        title: stream.title,
        headPortraitUrl: stream.users.headPortraitUrl,
        createTime: stream.users.video.createTime,
        relateVideo: relateVideo
      });
    } else {
      return resCode.dataFindFailure('dont has this video=>' + stream.userId);
    }
  }
};
