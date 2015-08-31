var assert = require('assert')
var flow = require('../../../lib/tasks/flow')

describe('Sequence', function() {

    it('should require tasks', function(done) {
        sequence(undefined, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "tasks" fails because ["tasks" is required]]')
            done()
        })
    })

    it('should require iterative tasks', function(done) {
        sequence(undefined, { tasks: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "tasks" fails because ["tasks" must be an array, "tasks" must be an object]]')
            done()
        })
    })

    it('should execute an array of tasks sequentially', function(done) {
        var order = []
        sequence(undefined, {
            tasks: [
                {
                    task: {
                        fn: function one(input, ctx, cb) {
                            order.push(1)
                            cb()
                        }
                    }
                }, {
                    task: {
                        fn: function two(input, ctx, cb) {
                            order.push(2)
                            cb()
                        }
                    }
                }
            ]
        }, function(err) {
            assert.ifError(err)
            assert.equal(order.length, 2)
            assert.equal(order[0], 1)
            assert.equal(order[1], 2)
            done()
        })
    })

    it('should execute a map of tasks sequentially', function(done) {
        var order = []
        sequence(undefined, {
            tasks: {
                a: {
                    task: {
                        fn: function one(input, ctx, cb) {
                            order.push(1)
                            cb()
                        }
                    }
                },
                b: {
                    task: {
                        fn: function two(input, ctx, cb) {
                            order.push(2)
                            cb()
                        }
                    }
                }
            }
        }, function(err) {
            assert.ifError(err)
            assert.equal(order[0], 1)
            assert.equal(order[1], 2)
            done()
        })
    })

    it('should pass the output from one task as input to the next', function(done) {
        sequence(1, {
            tasks: [
                {
                    task: {
                        fn: function one(input, ctx, cb) {
                            cb(null, input + 1)
                        }
                    }
                }, {
                    task: {
                        fn: function two(input, ctx, cb) {
                            cb(null, input + 1)
                        }
                    }
                }
            ]
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, 3)
            done()
        })
    })

    it('should yield errors', function(done) {
        sequence(undefined, {
            tasks: [
                {
                    task: {
                        fn: function(input, ctx, cb) {
                            cb(new Error('nothing to see here'))
                        }
                    }
                }
            ]
        }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'nothing to see here')
            done()
        })
    })

    function sequence(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: flow.sequence,
                params: params
            }
        }, cb)
    }
})