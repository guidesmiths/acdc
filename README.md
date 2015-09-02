# AC/DC

JavaScript object transformation

```js
var assert = require('assert')
var tasks = require('acdc/lib/tasks')
var dsl = require('acdc/lib/dsl')


acdc(runner)
    .bind(tasks.flow)
    .bind(tasks.dsl)
    .bind(tasks.property)
    .bind(tasks.string)
    .bind(tasks.logic)
    .run(function(dsl, cb) {
        with (dsl) {
            cb(sequence([
                input({ a: 'x', b: 'y' }),
                fork({
                    a: get('a'),
                    b: get('b')
                }),
                task(function slash(input, ctx, cb) {
                    cb(null, input.a + '/' + input.b)
                }),
                choose([
                    when(eq('y/x'), input('oh no!')),
                    when(eq('x/y'), input('oh yeah!'))
                ]),
                set('z'),
                copy('z', 'z2'),
                transform('z2', uppercase(), 'Z2')
            ]))
        }
    })
    .done(function(err, result) {
        assert.equal(result.Z2, 'OH YEAH!')
    })
```
