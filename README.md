# AC/CD

JavaScript object transformation

```js
var assert = require('assert')
var transform = require('acdc')
var flow = require('../lib/tasks/flow')
var selectors = require('../lib/tasks/selectors')
var mutators = require('../lib/tasks/mutators')
var transformation = require('../lib/tasks/transformation')
var dsl = require('../lib/dsl')
var R = require('ramda')

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
            task(function uc(ctx, cb) {
                cb(null, ctx.input.toUpperCase())
            }),
            set('z'),
            copy('z', 'z2')
        ]), function(err, result) {
            assert.equal(result.z2, 'X/Y')
        }
    )
}
```