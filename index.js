var debug = require('debug')('acdc:index')
var R = require('ramda')
var flow = require('./lib/tasks/flow')
var format = require('util').format

module.exports = function acdc(runner) {

    var dsl = {}
    var task
    var binders = {
        'function': bindFunction,
        'object': bindObject,
        'invalid': bindInvalid
    }

    return {
        bind: bind,
        run: run
    }

    function bind(subject) {
        return (binders[typeof subject] || binders.invalid)(subject)
    }

    function bindFunction(subject) {
        var name = subject.name || subject.fn && subject.fn.name
        if (name) bindProperty(name, subject)

        return {
            bind: name ? bind : R.curry(bail, 'You must alias anonymous functions'),
            alias: aliasFunction.bind(null, subject),
            run: name ? run : R.curry(bail, 'You must alias anonymous functions')
        }
    }

    function bindObject(subject) {
        R.keys(subject).forEach(function(name) {
            bindProperty(name, subject[name])
        })

        return {
            bind: bind,
            alias: aliasObject.bind(null, subject),
            run: run
        }
    }

    function bindInvalid(subject) {
        bail(format('Cannot bind %s', typeof subject))
    }

    function bindProperty(name, value) {
        debug('Binding %s', name)
        if (dsl[name]) bail(format('%s has already been bound', name))
        dsl[name] = value
    }

    function aliasFunction(subject, alias) {
        debug('Aliasing %s', alias)
        bindProperty(alias, subject)

        return {
            bind: bind,
            alias: R.curry(alias, subject),
            run: run
        }
    }

    function aliasObject(subject, aliases) {
        debug('Aliasing %s', aliases)

        R.keys(aliases).forEach(function(alias) {
            bindProperty(alias, subject[aliases[alias]])
        })

        return {
            bind: bind,
            alias: R.curry(aliasObject, subject),
            run: run
        }
    }

    function bail(message) {
        throw new Error(message)
    }

    function run(cb) {
        cb(dsl, function(_task) {
            task = _task
        })
        return {
            done: done
        }
    }

    function done(cb) {
        (runner || flow.domain).fn(undefined, { params: task }, function(err, result) {
            cb(err, result)
        })
    }
}