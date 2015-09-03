# AC/DC

JavaScript object transformation

```js
var assert = require('assert')
var tasks = require('acdc/lib/tasks')
var dsl = require('acdc/lib/dsl')


acdc()
    .bind(tasks.flow)
    .bind(tasks.dsl)
    .bind(tasks.property)
    .bind(tasks.string)
    .bind(tasks.logic)
    .run(function(dsl, cb) {
        with (dsl) {
            cb(sequence([
                yield({ a: [1, 2], b: [ 'dog', 'cat' ] }),       // Yields { a: [1, 2], b: [ 'dog', 'cat' ] }
                fork({
                    a: copy('a[0]', 'x'),                        // Yields { x: 1 }
                    b: copy('b[1]', 'y')                         // Yields { y: 'cat' }
                }),                                              // Yields { x: 1, y: 'cat' }
                task(function slash(input, ctx, cb) {
                    cb(null, input.x + '/' + input.y)            // Yields '1/cat'
                }),
                choose([
                    when(eq('2/dog'), yield('oh no!')),
                    when(eq('1/cat'), yield('oh yeah!'))
                ]),                                              // Yields 'oh yeah!'
                set('answer'),                                   // Yields { answer: 'oh yeah!' }
                transform('answer', uppercase(), 'uc_answer')    // Yields { uc_answer: 'OH YEAH!' }
                get('uc_answer')                                 // Yields 'OH YEAH!'
            ]))
        }
    })
    .done(function(err, result) {
        assert.equal(result, 'OH YEAH!')
    })
```
