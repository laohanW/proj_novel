const gulp = require('gulp')
const eslint = require('gulp-eslint')
const nodemon = require('gulp-nodemon')
const friendlyFormatter = require('eslint-friendly-formatter')

var jsScript = 'node'
if (process.env.npm_config_argv !== undefined && process.env.npm_config_argv.indexOf('debug') > 0) {
  jsScript = 'node debug'
}

function lineOne (anims) {
  return gulp.src(anims)
    .pipe(eslint({configFile: './.eslintrc.js'}))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.results(results => {
      console.log(`--Total Results:${results.length}`)
      console.log(`--Total Warning:${results.warningCount}`)
      console.log(`--Total Errors:${results.errorCount}`)
      console.log('Finishd eslint')
    }))
}
gulp.task('Eslint', () => {
  return gulp.src(['src/**/*.js', '!node_modules/**'])
    .pipe(eslint({configFile: './.eslintrc.js'}))
    .pipe(eslint.format(friendlyFormatter))
    .pipe(eslint.results(results => {
      console.log(`--Total Results:${results.length}`)
      console.log(`--Total Warning:${results.warningCount}`)
      console.log(`--Total Errors:${results.errorCount}`)
      console.log('Finishd eslint')
    }))
})
gulp.task('Eslint_nodemon', ['Eslint'], function () {
  var stream = nodemon({
    script: 'build/dev-server.js',
    execMap: {
      js: jsScript
    },
    tasks: function (changeFiles) {
      lineOne(changeFiles)
      return []
    },
    verbose: true,
    ignore: ['build/*.js', 'build/*.sh', 'dist/*.js', 'nodemon.json', '.git', 'node_modules/**/node_modules', 'gulpfile.js', 'test/**', 'newrelic_agent.log'],
    env: {
      NODE_ENV: 'development'
    },
    ext: 'js json'
  })
  return stream.on('restart', function () {

  }).on('crash', function () {
    console.error('Application has crash !')
  })
})
gulp.task('nodemon', function () {
  return nodemon({
    script: 'build/dev-server.js',
    execMap: {
      js: jsScript
    },
    verbose: true,
    ignore: ['build/*.js', 'build/*.sh', 'dist/*.js', 'nodemon.json', '.git', 'node_modules/**/node_modules', 'gulpfile.js', 'test/**', 'newrelic_agent.log'],
    env: {
      NODE_ENV: 'development'
    },
    ext: 'js json'
  })
})
gulp.task('default', ['nodemon'], function () {

})
