var assert = require('assert')
var flow = require('../../../lib/tasks/flow')

describe('Fork', function() {

    it('should require tasks', function(done) {
        fork(undefined, undefined, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "tasks" fails because ["tasks" is required]]')
            done()
        })
    })

    it('should require iterable tasks', function(done) {
        fork(undefined, { tasks: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "tasks" fails because ["tasks" must be an array, "tasks" must be an object]]')
            done()
        })
    })

    it('should pass the same input to each task', function(done) {
        fork(1, {
            tasks: {
                a: {
                    task: {
                        fn: function a(input, ctx, cb) {
                            cb(null, input + 1)
                        }
                    }
                },
                b: {
                    task: {
                        fn: function b(input, ctx, cb) {
                            cb(null, input + 2)
                        }
                    }
                }
            }
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.a, 2)
            assert.equal(result.b, 3)
            done()
        })
    })

   it('should yield an array', function(done) {
        fork(undefined, {
            tasks: [
                {
                    task: {
                        fn: function one(input, ctx, cb) {
                            cb(null, 'a')
                        }
                    }
                },
                {
                    task: {
                        fn: function two(input, ctx, cb) {
                            cb(null, 'b')
                        }
                    }
                }
            ]
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.sort()[0], 'a')
            assert.equal(result.sort()[1], 'b')
            done()
        })
    })

    it('should yield a map', function(done) {
        fork(undefined, {
            tasks: {
                a: {
                    task: {
                        fn: function one(input, ctx, cb) {
                            cb(null, 'a')
                        }
                    }
                },
                b: {
                    task: {
                        fn: function two(input, ctx, cb) {
                            cb(null, 'b')
                        }
                    }
                }
            }
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.a, 'a')
            assert.equal(result.b, 'b')
            done()
        })
    })

    it('should yield errors', function(done) {
        fork(undefined, {
            tasks: [
                {
                    task: {
                        fn: function(input, ctx, cb) {
                            cb(new Error('nothing to see here'))
                        }
                    }
                }
            ]
        }, function(err, results) {
            assert.ok(err)
            assert.equal(err.message, 'nothing to see here')
            done()
        })
    })

    function fork(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: flow.fork,
                params: params
            }
        }, cb)
    }
})
