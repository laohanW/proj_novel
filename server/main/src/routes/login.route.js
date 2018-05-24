'use strict';
const Joi = require('joi');
const handlers = require('../handlers')
module.exports = [
  {
    method: 'POST',
    path: '/login/register',
    config: {
      handler: handlers.login.register,
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
          account: Joi.string().required().description('the id for the todo item'),
          password: Joi.string().required().description('password'),
          name: Joi.string().required().description('name'),
          sex: Joi.number().integer().required().description('sex'),
          age: Joi.number().integer().required().description('age'),
          phone: Joi.number().integer().required().description('phone'),
          country: Joi.number().integer().required().description('country')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/login/remove',
    config: {
      handler: handlers.login.remove,
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
    path: '/login/resetPassword',
    config: {
      handler: handlers.login.resetPassword,
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
          account: Joi.string().required().description('the id for the todo item'),
          oldPassword: Joi.string().required().description('old password'),
          newPassword: Joi.string().required().description('new password')
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/login/login',
    config: {
      handler: handlers.login.login,
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
          account: Joi.string().required().description('the id for the todo item'),
          oldPassword: Joi.string().required().description('old password'),
          newPassword: Joi.string().required().description('new password')
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/login/imageCode',
    config: {
      handler: handlers.login.imageCode,
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
      tags: ['api'] // ADD THIS TAG
    }
  },
  {
    method: 'POST',
    path: '/login/messageCode',
    config: {
      handler: handlers.login.messageCode,
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
      description: 'POST',
      notes: 'Returns a todo item by the id passed in the path',
      tags: ['api'], // ADD THIS TAG,
      validate: {
        payload: {
          phone: Joi.string().required().description('the id for the todo item')
        }
      }
    }
  }
]
