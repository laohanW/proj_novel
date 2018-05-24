'use strict';
const Joi = require('joi');
const handlers = require('../handlers')
module.exports = [
  {
    method: 'POST',
    path: '/test/get',
    config: {
      handler: handlers.base,
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
          payloadType: 'json',
          deprecated: true
        }
      },
      description: 'Get',
      notes: 'Returns a todo item by the id passed in the path',
      tags: ['api'], // ADD THIS TAG,
      validate: {
        payload: {
          id: Joi.number().required().description('the id for the todo item')
        }
      }
    }
  }
]
