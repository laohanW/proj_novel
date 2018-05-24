'use strict';
const Joi = require('joi');
const handlers = require('../handlers')
module.exports = [
  {
    method: 'POST',
    path: '/user/detailInfo',
    config: {
      handler: handlers.user.detailInfo,
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
      description: 'Get',
      notes: 'Returns a todo item by the id passed in the path',
      tags: ['api'], // ADD THIS TAG,
      validate: {
        payload: {
          account: Joi.string().required().description('the id for the todo item')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/user/infoInLiveStream',
    config: {
      handler: handlers.user.infoInLiveStream,
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
      description: 'Get',
      notes: 'Returns a todo item by the id passed in the path',
      tags: ['api'], // ADD THIS TAG,
      validate: {
        payload: {
          streamId: Joi.number().integer().required().description('the id for the todo item')
        }
      }
    }
  }
]
