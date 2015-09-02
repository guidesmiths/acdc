var R = require('ramda')
var fs = require('fs')
var path = require('path')

module.exports = R.reduce(function(directories, file) {
    if (!fs.statSync(path.join(__dirname, file)).isDirectory()) return directories
    directories[file] = require(path.join(__dirname, file))
    return directories
}, {}, fs.readdirSync(__dirname))