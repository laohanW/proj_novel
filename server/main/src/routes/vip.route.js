'use strict';
const Joi = require('joi');
const handlers = require('../handlers')
module.exports = [
  {
    method: 'POST',
    path: '/vip/add',
    config: {
      handler: handlers.vip.add,
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
          imageUrl: Joi.string().required().description('large image asset url'),
          miniIcon: Joi.string().required().description('vip mini icon asset url'),
          money: Joi.number().integer().description('how money this vip level')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/vip/remove',
    config: {
      handler: handlers.vip.remove,
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
          id: Joi.number().required().description('the id for the todo item')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/vip/modify',
    config: {
      handler: handlers.vip.modify,
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
          id: Joi.number().integer().required().description('this vip id'),
          imageUrl: Joi.string().required().description('large image asset url'),
          miniIcon: Joi.string().required().description('vip mini icon asset url'),
          money: Joi.number().integer().description('how money this vip level')
        }
      }
    }
  }
]
