var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var logic = require('../../../lib/tasks/logic')

describe('And', function() {

    it('should require tasks param to be an array', function(done) {
        and(undefined, { tasks: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "tasks" fails because ["tasks" must be an array]]')
            done()
        })
    })

    it('should yield true if all tasks yield a truthy value', function(done) {
        and('blah', {
            tasks: [
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, input === 'blah')
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, true)
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, 'ok')
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, 1)
                        }
                    }
                }
            ]
        }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, true)
            done()
        })
    })

    it('should yield false if one task yields a falsey value', function(done) {
        and('blah', {
            tasks: [
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, input === 'blah')
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, true)
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, 0)
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, 1)
                        }
                    }
                }
            ]
        }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, false)
            done()
        })
    })

    function and(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: logic.and,
                params: params
            }
        }, cb)
    }
})
