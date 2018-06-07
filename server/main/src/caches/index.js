const Glob = require('glob');
const Path = require('path');
const pattern = './*.cache.js';

let internals = {};
module.exports = {
  initialize: function (redis) {
    const globtions = {
      nodir: true,
      strict: true,
      ignore: [],
      cwd: Path.dirname(__filename)
    }
    const matches = Glob.sync(pattern, globtions);
    matches.forEach(match => {
      const load = require(globtions.cwd + '/' + match);
      load.redis = redis;
      const conHandlerName = Path.basename(match, Path.extname(match));
      const handlerName = Path.basename(conHandlerName, Path.extname(conHandlerName));
      const cls = load.default || load;
      cls.name = handlerName;
      internals[handlerName] = cls;
    });
  },
  caches: internals
}
