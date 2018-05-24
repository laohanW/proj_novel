'use strict';
const Joi = require('joi');
const handlers = require('../handlers');
module.exports = [
  {
    method: 'GET',
    path: '/gift/list',
    config: {
      handler: handlers.gift.list,
      plugins: {
        'hapi-swagger': {
          responses: {
            '400': {
              description: 'BadRequest',
              schema: Joi.object({
                equals: Joi.number()
              }).label('Result')
            }
          },
          payloadType: 'json'
        }
      },
      description: '获取礼物列表',
      notes: '获取礼物列表',
      tags: ['api'] // ADD THIS TAG,
    }
  },
  {
    method: 'POST',
    path: '/gift/give',
    config: {
      handler: handlers.gift.give,
      plugins: {
        'hapi-swagger': {
          responses: {
            '400': {
              description: 'BadRequest',
              schema: Joi.object({
                equals: Joi.number()
              }).label('Result')
            }
          },
          payloadType: 'json'
        }
      },
      description: '送礼物',
      notes: '送礼物',
      tags: ['api'], // ADD THIS TAG,
      validate: {
        payload: {
          userId: Joi.number().required().description('赠送者 '),
          targetId: Joi.number().required().description('赠送给的目标人'),
          giftId: Joi.number().required().description('礼物id')
        }
      }
    }
  }
]
