var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var logic = require('../../../lib/tasks/logic')
var property = require('../../../lib/tasks/property')

describe('Choose', function() {

    it('should require options to be an array', function(done) {
        choose(undefined, { options: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "options" fails because ["options" must be an array]]')
            done()
        })
    })

    it('should tolerate no options', function(done) {
        choose(2, {
            options: []
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    it('should run the first applicable option', function(done) {
        choose(2, {
            options: [
                {
                    task: logic.when,
                    params: {
                        condition: {
                            task: logic.eq,
                            params: {
                                value: 1
                            }
                        },
                        task: {
                            task: {
                                fn: function(input, ctx, cb) {
                                    cb(new Error('should not have been run'))
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
                                value: 2
                            }
                        },
                        task: {
                            task: {
                                fn: function(input, ctx, cb) {
                                    cb(null, 'Oh Yeah!')
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
                                value: 3
                            }
                        },
                        task: {
                            task: {
                                fn: function(input, ctx, cb) {
                                    cb(new Error('should not have been run'))
                                }
                            }
                        }
                    }
                }
            ]
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, 'Oh Yeah!')
            done()
        })
    })

    function choose(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: logic.choose,
                params: params
            }
        }, cb)
    }
})