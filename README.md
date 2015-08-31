# AC/DC

JavaScript object transformation

```js
var assert = require('assert')
var transform = require('acdc')
var flow = require('../lib/tasks/flow')
var properties = require('../lib/tasks/properties')
var string = require('../lib/tasks/string')
var dsl = require('../lib/dsl')

acdc().bind(flow)
    .bind(dsl.task)
    .bind(property)
    .bind(string)
    .transform({ a: ['x'], b: ['y'] })
    .using(function(dsl, cb) {
        with(dsl) {
            cb(sequence([
                fork({
                    a: get('a[0]'),                     // yields 'x'
                    b: get('b[0]')                      // yields 'y'
                }),                                     // yields { a: 'x', b: 'y' }
                task(function slash(input, ctx, cb) {
                    cb(null, input.a + '/' + input.b)   
                }),                                     // yields 'x/y'
                set('z'),                               // yields { z: 'x/y' }
                copy('z', 'z2'),                        // yields { z2: 'x/y' }
                transform('z2', uppercase(), 'Z2')      // yields { Z2: 'X/Y' }
            ]))
        }
    })
    .done(function(err, result) {
        assert.equal(result.Z2, 'X/Y')
    })
```
