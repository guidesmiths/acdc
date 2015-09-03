var assert = require('assert')
var acdc = require('..')
var flow = require('../lib/tasks/flow')
var property = require('../lib/tasks/property')
var string = require('../lib/tasks/string')
var logic = require('../lib/tasks/logic')
var transformation = require('../lib/tasks/transformation')
var dsl = require('../lib/dsl')
var async = require('async')
var R = require('ramda')

describe('AC/DC', function() {

    [flow.run, flow.domain].forEach(function(runner) {

        describe(runner.fn.name, function() {

            it('should execute a task', function(done) {
                var executed = false
                acdc(runner).run(function(dsl, cb) {
                    cb({
                        task: {
                            fn: function dummy(input, ctx, cb) {
                                executed = true
                                cb()
                            }
                        }
                    })
                }).done(function(err) {
                    assert.ifError(err)
                    assert.ok(executed)
                    done()
                })
            })

            it('should execute a task', function(done) {
                var executed = false
                acdc(runner).run(function(dsl, cb) {
                    cb({
                        task: {
                            fn: function dummy(input, ctx, cb) {
                                executed = true
                                cb()
                            }
                        }
                    })
                }).done(function(err) {
                    assert.ifError(err)
                    assert.ok(executed)
                    done()
                })
            })

            it('should yield a result', function(done) {
                acdc(runner).run(function(dsl, cb) {
                    cb({
                        task: {
                            fn: function dummy(input, ctx, cb) {
                                cb(null, 123)
                            }
                        }
                    })
                }).done(function(err, result) {
                    assert.ifError(err)
                    assert.equal(result, 123)
                    done()
                })
            })

            it('should yield errors', function(done) {
                acdc(runner).run(function(dsl, cb) {
                    cb({
                        task: {
                            fn: function dummy(input, ctx, cb) {
                                cb(new Error('nothing to see here'))
                            }
                        }
                    })
                }).done(function(err, result) {
                    assert.ok(err)
                    assert.equal(err.message, 'nothing to see here')
                    done()
                })
            })

            it('should support complex conversion flows', function(done) {
                acdc(runner).run(function(dsl, cb) {
                    cb({
                        task: flow.sequence,
                        params: {
                            tasks: [
                                {
                                    task: flow.output,
                                    params: {
                                        value: { a: 'x', b: 'y' }
                                    }
                                },
                                {
                                    task: flow.fork,
                                    params: {
                                        tasks: {
                                            a: {
                                                task: property.get,
                                                params: {
                                                    path: 'a'
                                                }
                                            },
                                            b: {
                                                task: property.get,
                                                params: {
                                                    path: 'b'
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    task: {
                                        fn: function slash(input, ctx, cb) {
                                            cb(null, input.a + '/' + input.b)
                                        }
                                    }
                                },
                                {
                                    task: logic.choose,
                                    params: {
                                        options: [
                                            {
                                                task: logic.when,
                                                params: {
                                                    condition: {
                                                        task: logic.eq,
                                                        params: {
                                                            value: 'does not match'
                                                        }
                                                    },
                                                    task: {
                                                        task: {
                                                            fn: function err(input, ctx, cb) {
                                                                cb(new Error('wrong condition'))
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                task: logic.when,
                                                params: {
                                                    condition: {
                                                        task: logic.eq,
                                                        params: {
                                                            value: 'x/y'
                                                        }
                                                    },
                                                    task: {
                                                        task: {
                                                            fn: function err(input, ctx, cb) {
                                                                cb(null, 'oh yeah!')
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    })
                }).done(function(err, result) {
                    assert.ifError(err)
                    assert.equal(result, 'oh yeah!')
                    done()
                })
            })

            it('should support shorthand syntax', function(done) {
                acdc(runner)
                    .bind(flow)
                    .bind(dsl)
                    .bind(property)
                    .bind(string)
                    .bind(logic)
                    .run(function(dsl, cb) {
                        with (dsl) {
                            cb(sequence([
                                output({ a: 'x', b: 'y' }),
                                fork({
                                    a: get('a'),
                                    b: get('b')
                                }),
                                task(function slash(input, ctx, cb) {
                                    cb(null, input.a + '/' + input.b)
                                }),
                                choose([
                                    when(eq('y/x'), output('oh no!')),
                                    when(eq('x/y'), output('oh yeah!'))
                                ]),
                                set('z'),
                                copy('z', 'z2'),
                                transform('z2', uppercase(), 'Z2')
                            ]))
                        }
                    })
                    .done(function(err, result) {
                        assert.ifError(err)
                        assert.equal(result.Z2, 'OH YEAH!')

                        assert.equal(typeof sequence, 'undefined')
                        assert.equal(typeof fork, 'undefined')
                        assert.equal(typeof get, 'undefined')
                        assert.equal(typeof set, 'undefined')
                        assert.equal(typeof copy, 'undefined')
                        assert.equal(typeof transform, 'undefined')
                        assert.equal(typeof task, 'undefined')

                        done()
                    })
            })

            if (runner === flow.domain) {
                it('shoud yield thrown errors', function(done) {
                    acdc(flow.domain).run(function(dsl, cb) {
                        cb({
                            task: {
                                fn: function dummy(input, ctx, cb) {
                                    throw new Error('nothing to see here')
                                }
                            }
                        })
                    }).done(function(err, result) {
                        assert.ok(err)
                        assert.equal(err.message, 'nothing to see here')
                        done()
                    })
                })

                it('shoud yield thrown errors in async code', function(done) {
                    acdc(flow.domain).run(function(dsl, cb) {
                        cb({
                            task: {
                                fn: function dummy(input, ctx, cb) {
                                    setImmediate(function() {
                                        throw new Error('nothing to see here')
                                    })
                                }
                            }
                        })
                    }).done(function(err, result) {
                        assert.ok(err)
                        assert.equal(err.message, 'nothing to see here')
                        done()
                    })
                })

                it('shoud yield errors thrown from synchronous code wrapped by async', function(done) {
                    acdc(flow.domain).run(function(dsl, cb) {
                        cb({
                            task: {
                                fn: function dummy(input, ctx, cb) {
                                    async.series([
                                        function() {
                                            throw new Error('nothing to see here')
                                        }
                                    ])
                                }
                            }
                        })
                    }).done(function(err, result) {
                        assert.ok(err)
                        assert.equal(err.message, 'nothing to see here')
                        done()
                    })
                })
            }
        })
    })
})