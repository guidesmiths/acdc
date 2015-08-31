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
    alias('transform', transformProperty)

    acdc(
        { a: 'x', b: 'y' },
        sequence([
            fork({
                a: get('a'),
                b: get('b')
            }),
            task(function slash(input, ctx, cb) {
                cb(null, input.a + '/' + input.b)
            }),
            set('z'),
            copy('z', 'z2'),
            transform('z2', uppercase(), 'Z2')
        ]), function(err, result) {
            assert.ifError(err)
            assert.equal(result.Z2, 'X/Y')
            done()
        }
    )
}
```