var assert = require('assert')
var acdc = require('..')
var flow = require('../lib/tasks/flow')
var property = require('../lib/tasks/property')
var string = require('../lib/tasks/string')
var logic = require('../lib/tasks/logic')
var array = require('../lib/tasks/array')
var collection = require('../lib/tasks/collection')
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
                    .bind(flow).alias({ seq: 'sequence' })
                    .bind(dsl)
                    .bind(property)
                    .bind(string)
                    .bind(logic)
                    .run(function(dsl, cb) {
                        with (dsl) {
                            cb(seq([
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

            it('should reject shorthand functions with too many arguments', function(done) {
                try {
                    acdc(runner)
                        .run(function(dsl, cb) {
                            cb(flow.sequence(1, 2))
                        })
                } catch(err) {
                    assert.equal(err.message, 'Task sequence has 2 arguments but only takes 1 parameters')
                    done()
                }
            })

            it('should support aliased task functions', function(done) {
                acdc(runner)
                    .bind(flow.sequence).alias('seq')
                    .run(function(dsl, cb) {
                        with (dsl) {
                            cb(seq([
                            ]))
                        }
                    })
                    .done(done)
            })

            it('should reject duplicate task function aliases', function(done) {
                try {
                    acdc(runner).bind(flow.sequence).alias('seq').alias('seq')
                } catch(err) {
                    assert.ok(err)
                    assert.equal(err.message, 'seq has already been bound')
                    done()
                }
            })

            it('should support aliased task objects', function(done) {
                acdc(runner)
                    .bind(flow).alias({ seq: 'sequence' })
                    .run(function(dsl, cb) {
                        with (dsl) {
                            cb(seq([
                            ]))
                        }
                    })
                    .done(done)
            })

            it('should reject duplicate task objects aliases', function(done) {
                try {
                    acdc(runner).bind(flow).alias({ seq: 'sequence' }).alias({ seq: 'sequence' })
                } catch(err) {
                    assert.ok(err)
                    assert.equal(err.message, 'seq has already been bound')
                    done()
                }
            })

            it('should not cause maximum call stack size exceeded errors', function(done) {

                this.timeout(10000)

                var executed = 0
                var items = []
                for (var i = 0; i < 50000; i++) {
                    items.push(i)
                }

                acdc(runner)
                    .run(function(dsl, cb) {
                        cb(flow.sequence([
                            flow.output(items),
                            {
                                task: collection.map,
                                params: {
                                    task: {
                                        fn: function uppercase(input, ctx, cb) {
                                            executed++
                                            cb()
                                        }
                                    }
                                }
                            }
                        ]))
                    }).done(function(err) {
                        assert.ifError(err)
                        assert.equal(executed, 50000)
                        done()
                    })
            })

            if (runner === flow.domain) {
                it('should yield thrown errors', function(done) {
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

                it('should yield thrown errors in async code', function(done) {
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

                it('should yield errors thrown from synchronous code wrapped by async', function(done) {
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