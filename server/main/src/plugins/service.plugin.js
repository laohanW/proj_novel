const Glob = require('glob');
const Path = require('path');
const Debug = require('debug')('plugin:service')

module.exports = async function (server, options) {
  for (let i = 0; i < options.arr.length; i++) {
    let value = options.arr[i]
    let globtions = {
      nodir: true,
      strict: true,
      ignore: [],
      cwd: Path.resolve(__dirname, '../' + value + 's/')
    }
    let req = require('../' + value + 's/')
    let matches = await Glob.sync('./*.' + value + '.js', globtions);
    matches.forEach(match => {
      let load = require(Path.resolve(globtions.cwd, match));
      let conHandlerName = Path.basename(match, Path.extname(match));
      let handlerName = Path.basename(conHandlerName, Path.extname(conHandlerName));
      let cls = load.default || load;
      req[handlerName] = cls;
      Debug(value, cls)
    });
  }
}
