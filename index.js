var debug = require('debug')('acdc:index')
var R = require('ramda')
var flow = require('./lib/tasks/flow')
var format = require('util').format

module.exports = function acdc() {

    var dsl = {}
    var input
    var task
    var _bindMethods = {
        'function': _bindFunction,
        'object': _bindObject,
        'invalid': _bindInvalid
    }

    return {
        bind: _bind,
        run: _run
    }

    function _bind(subject) {
        return (_bindMethods[typeof subject] || _bindMethods.invalid)(subject)
    }

    function _bindFunction(subject) {
        var name = subject.name || subject.fn && subject.fn.name
        if (name) _bindProperty(name, subject)

        return {
            bind: name ? _bind : _bail.bind(null, 'You must alias anonymous functions'),
            alias: _alias.bind(null, subject),
            run: name ? _run : _bail.bind(null, 'You must alias anonymous functions')
        }
    }

    function _bindObject(subject) {
        R.keys(subject).forEach(function(name) {
            _bindProperty(name, subject[name])
        })

        return {
            bind: _bind,
            run: _run
        }
    }

    function _bindInvalid(subject) {
        _bail(format('Cannot bind %s', typeof subject))
    }

    function _bindProperty(name, value) {
        debug('Binding %s', name)
        if (dsl[name]) _bail(format('%s has already been bound', name))
        dsl[name] = value
    }

    function _alias(subject, alias) {
        debug('Aliasing %s', alias)
        _bindProperty(alias, subject)

        return {
            bind: _bind,
            alias: _alias.bind(null, subject),
            run: _run
        }
    }

    function _bail(message) {
        throw new Error(message)
    }

    function _run(cb) {
        cb(dsl, function(_task) {
            task = _task
        })
        return {
            done: _done
        }
    }

    function _done(cb) {
        flow.domain.fn(input, { params: task }, function(err, result) {
            cb(err, result)
        })
    }
}