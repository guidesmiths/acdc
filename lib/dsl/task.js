module.exports = function task(fn, params) {
    return {
        task: {
            fn: fn
        },
        params: params
    }
}