'use strict'

const glob = require('glob')
const Path = require('path')

module.exports = async function (server, options) {
  const isArray = Array.isArray || function (arr) {
    return {}.toString.call(arr) === '[object Array]';
  };
  const isObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  const cast = (value) => {
    return isArray(value) ? value : [value];
  };
  var globOptions = {
    ignore: cast(options.ignore),
    nodir: true,
    strict: true,
    cwd: options.cwd || Path.dirname(__filename)
  }
  const matchs = await glob.sync(options.pattern, globOptions)
  matchs.forEach(match => {
    var route = require(globOptions.cwd + '/' + match)
    const cls = route.default || route;
    if (isArray(cls)) {
      cls.forEach(function (element) {
        server.route(element)
        console.log(element.url)
      });
    } else if (isObject(cls)) {
      server.route(cls);
      console.log(cls.url)
    }
  })
}
