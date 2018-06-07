'use strict'
const Glob = require('glob');
const Path = require('path');
const Sequelize = require('sequelize');
const LocalStorage = require('continuation-local-storage');

module.exports = async function (fastify, options) {
  const namespace = LocalStorage.createNamespace(options.namespace);
  let tables = {};
  let defineTables = {};
  const globtions = {
    nodir: true,
    strict: true,
    ignore: [],
    cwd: options.cwd || process.cwd()
  }
  const isArray = Array.isArray || function (arr) {
    return {}.toString.call(arr) === '[object Array]';
  };
  const cast = (value) => {
    return isArray(value) ? value : [value];
  };
  const matches = await Glob.sync(options.pattern, globtions);
  matches.forEach(match => {
    const load = require(globtions.cwd + '/' + match);
    const conHandlerName = Path.basename(match, Path.extname(match));
    const handlerName = Path.basename(conHandlerName, Path.extname(conHandlerName));
    const cls = load.default || load;
    tables[handlerName] = cls;
  });
  Sequelize.useCLS(namespace);
  const sequelize = new Sequelize(
    options.sequelize.database,
    options.sequelize.username,
    options.sequelize.password,
    options.sequelize.options
  );
  for (let m in tables) {
    let seq = sequelize.define(m, tables[m].model.table, tables[m].model.options);
    defineTables[m] = seq;
  }
  for (let m in tables) {
    if (tables[m].associate) {
      let tabArr = cast(tables[m].associate);
      tabArr.forEach(function (ele) {
        if (ele.type === 'belongsToMany') {
          defineTables[m].belongsToMany(defineTables[ele.to], ele.options);
        } else if (ele.type === 'belongsTo') {
          defineTables[m].belongsTo(defineTables[ele.to], ele.options);
        } else if (ele.type === 'hasMany') {
          defineTables[m].hasMany(defineTables[ele.to], ele.options);
        } else if (ele.type === 'hasOne') {
          defineTables[m].hasOne(defineTables[ele.to], ele.options);
        }
      });
    }
  }
  await sequelize.sync({force: options.syncForce});
  // console.log(require(options.modelIndex));
  // let ind = require(options.modelIndex);
  // ind.models = sequelize.models;
  // ind.transaction = sequelize.transaction;
  require(options.modelIndex).sequelize = sequelize;
  // console.log(require(options.modelIndex).models);
}
