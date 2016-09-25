#!/usr/bin/env node
'use strict'

var git = require('git-state')
var argv = require('minimist')(process.argv.slice(2))
var pkg = require('./package')

var VALID_BRANCHES = ['master', 'gh-pages']

var log = {
  info: function () {
    if (!argv.quiet && !argv.q) console.log.apply(console.log, arguments)
  },
  error: function () {
    if (!argv.quiet && !argv.q) console.error.apply(console.error, arguments)
  }
}

if (argv.version || argv.v) return version()
if (argv.help || argv.h) return help()

if (!git.isGitSync(process.cwd())) {
  log.error('No git repository detected - aborting...')
  process.exit(1)
  return
}

git.check(process.cwd(), function (err, result) {
  if (err) throw err

  var issues = Boolean(!~VALID_BRANCHES.indexOf(result.branch) ||
                       result.ahead || Number.isNaN(result.ahead) ||
                       result.dirty || result.untracked || result.stashes)

  if (!issues) {
    log.info('Everything looks good :)')
    process.exit()
    return
  }

  delete result.issues

  Object.keys(result).forEach(function (key) {
    var value = result[key]
    if (key === 'branch' && value === 'master') return
    if (typeof key === 'number' && value === 0) return
    log.info('%s: %s', key, value)
  })
  process.exit(1)
})

function version () {
  log.info(pkg.version)
  process.exit()
}

function help () {
  log.info(
    pkg.name + ' ' + pkg.version + '\n' +
    pkg.description + '\n\n' +
    'Usage:\n' +
    '  ' + pkg.name + ' [options]\n\n' +
    'Options:\n' +
    '  --help, -h     show this help\n' +
    '  --version, -v  show version\n' +
    '  --quiet, -q    don\'t output anything (check the exist code)'
  )
  process.exit()
}
