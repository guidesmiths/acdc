# AC/DC

AC/DC is a library for transforming one JavaScript object into another. We wrote it because we needed to transform a complex, legacy feed into a simpler one, in such a way that the poor soul who had to maintain it could do so without going insane.

AC/DC works on the concept of flows of tasks. The output from one task becomes the input for the next. The first task in a flow is implicitly set by AC/DC and will wrap the remaining tasks in a domain. The first explicit task in a flow will usually be a 'sequence'. Subsequent tasks may change the input document, apply transformations to it, or further control the flow.

AC/DC provides several out of the box tasks which can be 'bound' into the dsl for convenience. A simple flow would look like

```js
var tasks = require('acdc/lib/tasks')

acdc()
    .bind(tasks.flow)
    .bind(tasks.property)
    .bind(tasks.string)
    .bind(tasks.logic)
    .run(function(dsl, cb) {
        with (dsl) {
            cb(sequence([
                output({ a: [1, 2], b: [ 'dog', 'cat' ] }),      // Yields { a: [1, 2], b: [ 'dog', 'cat' ] }
                fork({
                    a: copy('a[0]', 'x'),                        // Yields { x: 1 }
                    b: copy('b[1]', 'y')                         // Yields { y: 'cat' }
                }),                                              // Yields { x: 1, y: 'cat' }
                task(function slash(input, ctx, cb) {
                    cb(null, input.x + '/' + input.y)            // Yields '1/cat'
                }),
                choose([
                    when(eq('2/dog'), output('oh no!')),
                    when(eq('1/cat'), output('oh yeah!'))
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

## Concepts

AC/DC works on the concept of flows of tasks. The output from one task becomes the input for the next. Tasks may control the flow (e.g. by forking the input to multiple subflows), select part of the input document

