'use strict';
const Joi = require('joi');
const handlers = require('../handlers')
module.exports = [
  {
    method: 'POST',
    path: '/video/upload',
    config: {
      handler: handlers.video.upload,
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
          userId: Joi.number().required().description('the id for the todo item'),
          url: Joi.string().required().description('url of video asset')
        }
      }
    }
  }
]
