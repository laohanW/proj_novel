'use strict';
const Joi = require('joi');
const handlers = require('../handlers');
module.exports = [
  {
    method: 'POST',
    path: '/subscription/add',
    config: {
      handler: handlers.subscription.add,
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
          targetId: Joi.number().required().description('subscrit to target')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/subscription/remove',
    config: {
      handler: handlers.subscription.remove,
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
          targetId: Joi.number().required().description('subscrit to target')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/subscription/list',
    config: {
      handler: handlers.subscription.list,
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
          userId: Joi.number()
            .required()
            .description('the id for the todo item')
        }
      }
    }
  }
]
