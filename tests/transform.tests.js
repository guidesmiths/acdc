var Domain = require('domain')
var assert = require('assert')
var transform = require('..')
var flow = require('../lib/tasks/flow')
var selectors = require('../lib/tasks/selectors')
var mutators = require('../lib/tasks/mutators')
var transformation = require('../lib/tasks/transformation')
var dsl = require('../lib/dsl')
var async = require('async')
var R = require('ramda')

describe('AC/DC', function() {

    it('should execute a task', function(done) {
        var executed = false
        transform({
            task: {
                fn: function dummy(ctx, cb) {
                    executed = true
                    cb()
                }
            }
        }, function(err) {
            Domain.create().on('error', done).run(function() {
                assert.ifError(err)
                assert.ok(executed)
                done()
            })
        })
    })

    it('should yield a result', function(done) {
        transform({
            task: {
                fn: function dummy(ctx, cb) {
                    cb(null, 123)
                }
            }
        }, function(err, result) {
            Domain.create().on('error', done).run(function() {
                assert.ifError(err)
                assert.equal(result, 123)
                done()
            })
        })
    })

    it('should yield errors', function(done) {
        transform({
            task: {
                fn: function dummy(ctx, cb) {
                    cb(new Error('nothing to see here'))
                }
            }
        }, function(err, result) {
            Domain.create().on('error', done).run(function() {
                assert.ok(err)
                assert.equal(err.message, 'nothing to see here')
                done()
            })
        })
    })

    it('shoud yield thrown errors', function(done) {
        transform({
            task: {
                fn: function dummy(ctx, cb) {
                    throw new Error('nothing to see here')
                }
            }
        }, function(err, result) {
            Domain.create().on('error', done).run(function() {
                assert.ok(err)
                assert.equal(err.message, 'nothing to see here')
                done()
            })
        })
    })

    it('shoud yield thrown errors in async code', function(done) {
        transform({
            task: {
                fn: function dummy(ctx, cb) {
                    setImmediate(function() {
                        throw new Error('nothing to see here')
                    })
                }
            }
        }, function(err, result) {
            Domain.create().on('error', done).run(function() {
                assert.ok(err)
                assert.equal(err.message, 'nothing to see here')
                done()
            })
        })
    })

    it('shoud yield errors thrown from synchronous code wrapped by async', function(done) {
        transform({
            task: {
                fn: function dummy(ctx, cb) {
                    async.series([
                        function() {
                            throw new Error('nothing to see here')
                        }
                    ])
                }
            }
        }, function(err, result) {
            Domain.create().on('error', done).run(function() {
                assert.ok(err)
                assert.equal(err.message, 'nothing to see here')
                done()
            })
        })
    })

    it('should support complex conversion flows', function(done) {
        transform(
            { a: 'x', b: 'y' },
            {
                task: flow.sequence,
                params: {
                    tasks: [
                        {
                            task: flow.fork,
                            params: {
                                tasks: {
                                    a: {
                                        task: selectors.getProperty,
                                        params: {
                                            path: 'a'
                                        }
                                    },
                                    b: {
                                        task: selectors.getProperty,
                                        params: {
                                            path: 'b'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            task: {
                                fn: function slash(ctx, cb) {
                                    cb(null, ctx.input.a + '/' + ctx.input.b)
                                }
                            }
                        }
                    ]
                }
            }, function(err, result) {
                Domain.create().on('error', done).run(function() {
                    assert.ifError(err)
                    assert.equal(result, 'x/y')
                    done()
                })
            }
        )
    })

    it('should support shorthand syntax', function(done) {
        with (R.mergeAll([flow, selectors, mutators, transformation, dsl])) {

            alias('get', getProperty)
            alias('set', setProperty)
            alias('copy', copyProperty)

            transform(
                { a: 'x', b: 'y' },
                sequence([
                    fork({
                        a: get('a'),
                        b: get('b')
                    }),
                    task(function slash(ctx, cb) {
                        cb(null, ctx.input.a + '/' + ctx.input.b)
                    }),
                    set('z'),
                    copy('z', 'z2')
                ]), function(err, result) {
                    Domain.create().on('error', done).run(function() {
                        assert.ifError(err)
                        assert.equal(result.z2, 'x/y')
                        done()
                    })
                }
            )
        }
    })
})