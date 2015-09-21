# AC/DC

AC/DC is a library for transforming one JavaScript object into another. We wrote it because we needed to transform a complex, legacy feed into a simpler one, in such a way that the poor soul who had to maintain it wouldn't going insane. It might also be useful for generating view models.

## Concepts

AC/DC works on the concept of flows of tasks. The output from one task becomes the input for the next. The first task in a flow is implicitly set by AC/DC and will wrap the remaining tasks in a domain. The first explicit task in a flow will usually be a 'sequence', which will execute a collection of other tasks. For example...


Given a customer
```
{
    "details": {
        "title": "Mr",
        "firstName": "Fred",
        "lastName": "Bloggs",
        "dateOfBirth": "2015-07-15T00:00:00.000+01:00"
    }
}
```

```
domain()
└── sequence()
    ├── output(customer)           // Yields the customer object
    ├── get('details.dateOfBirth') // Yields '2015-07-15T00:00:00.000+01:00'
    └── parseDate()                // Yields a JavaScript date object representing '2015-07-15T00:00:00.000+01:00'
```

To operate on multiple properties of an object use the ```fork``` task

```
domain()
└── sequence()
    ├── output(customer)             // Yields the customer object
    ├── fork()
    │   ├── get('details.title')     // Yields 'Mr'
    │   ├── get('details.firstName') // Yields 'Fred'
    │   └── get('details.lastName')  // Yields 'Bloggs'
    └── format('%s. %s %s')          // Yields 'Mr. Fred Bloggs'
```

For richer transformations use combinations of sequences, forks, get and set

```
domain()
└── sequence()
    ├── output(customer)
    ├── fork()
    │   ├── sequence()
    │   │   ├── get('details.dateOfBirth')
    │   │   ├── parseDate()
    │   │   └── set('dob')
    │   ├── sequence()
    │   │   ├── get('details.title')
    │   │   └── set('title')
    │   ├── sequence()
    │   │   ├── get('details.firstName')
    │   │   └── set('firstName')
    │   ├── sequence()
    │   │   ├── get('details.lastName')
    │   │   └── set('lastName')
    │   └── sequence()
    │       ├── render('{{details.title}}. {{details.firstName}} {{details.lastName')
    │       └── set('fullName')
    └── merge()
```
Yields
```
{
    title: 'Mr',
    firstName: 'Fred',
    lastName: 'Bloggs',
    fullname: 'Mr. Fred Bloggs',
    dob: Date<2015-07-15T00:00:00.000+01:00>
}
```

All of this gets a bit verbose, and could be more tersely written as
```
domain()
└── sequence()
    ├── output(customer)
    ├── fork()
    │   ├── transform('details.dateOfBirth', parseDate(), 'dob')
    │   ├── copy('details.title', 'title')
    │   ├── copy('details.firstName', 'firstName')
    │   ├── copy('details.lastName', 'lastName')
    │   └── sequence()
    │       ├── render('{{details.title}}. {{details.firstName}} {{details.lastName')
    │       └── set('fullName')
    └── merge()
```

### The Code
```js
var acdc = require('acdc')
var tasks = require('acdc/lib/tasks')
var sequence = tasks.flow.sequence
var output = tasks.flow.output
var fork = tasks.flow.fork
var copy = tasks.property.copy
var transform = tasks.property.transform
var parseDate = tasks.date.parseDate
var merge = tasks.array.merge
var render = tasks.hogan.render

acdc()
    .run((dsl, cb) => {
        cb(sequence([
            output(customer),
            fork([
                transform('details.dateOfBirth', parseDate(), 'dob'),
                copy('details.title', 'title'),
                copy('details.firstName', 'firstName'),
                copy('details.lastName', 'lastName'),
                sequence([
                    render('{{details.title}}. {{details.firstName}} {{details.lastName}}'),
                    set('fullName')
                ])
            ]),
            merge()
        ]))
    })
    .done(done)
```

### The DSL
If you're not opposed to using ```with``` you can reduce the number of imports as follows
```js
var acdc = require('acdc')
var tasks = require('acdc/lib/tasks')

acdc()
    .bind(tasks.flow),
    .bind(tasks.property),
    .bind(tasks.date),
    .bind(tasks.array),
    .bind(tasks.hogan)
    .run((dsl, cb) => {
        with(dsl) {
            cb(sequence([
                output(customer),
                fork([
                    transform('details.dateOfBirth', parseDate(), 'dob'),
                    copy('details.title', 'title'),
                    copy('details.firstName', 'firstName'),
                    copy('details.lastName', 'lastName'),
                    sequence([
                        render('{{details.title}}. {{details.firstName}} {{details.lastName}}'),
                        set('fullName')
                    ])
                ]),
                merge()
            ]))
        }
    })
    .done(done)
```

### Provided Tasks
AC/DC provides scores of tasks for transformation and flow control. We haven't got around to documenting them yet. Until we do, you'll need to use the source and tests.

### Custom Tasks
A simple task is an object with a 'fn' property of type function. We refer to this object as the task definition.
```js
module.exports = {
    fn: function uppercase(input, ctx, cb) {
        cb(null, input ? input.toUpperCase() : input)
    }
}
```
You can validate the input by adding a schema property
```js
var Joi = require('joi')
var schemas = require('acdc/lib/schemas')

module.exports = {
    fn: function uppercase(input, ctx, cb) {
        cb(null, input ? input.toUpperCase() : input)
    },
    schema: schemas.context.keys({
        input: Joi.string().allow('').optional()
    })
}
```
Before using your custom task in a flow you need to ```shorthand``` it. This will convert the task it into an executable function and copy function arguments to ```ctx.params```. If your task uses parameters, you **must** include a schema which validates the parameters since this will also determine argument position to parameter mapping.

Flow Definition
```js
var customTask = require('../my/custom/task')
var shorthand = require('acdc/lib/utils/shorthand')
var customTask = shorthand(customTaskDef)

acdc()
    .bind(tasks.flow),
    .bind(tasks.property)
    .run((dsl, cb) => {
        with(dsl) {
            cb(sequence([
                output(customer),
                get('details.title'),
                customTask('Fred', 'Bloggs'),
                set('title')
            ]))
        }
    })
    .done(done)

```
Task Definition
```js
var Joi = require('joi')
var _ = require('lodash')
var schemas = require('acdc/lib/schemas')
var R = require('ramda')

module.exports = {
    fn: function get(input, ctx, cb) {
        cb(null, ctx.params.firstName + ' ' + ctx.parmas.lastName)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
        })
    })
}
```
### Custom Task Libraries
If you write lots of custom tasks you may want to organise them into libraries and require them en masse. See ```acdc/utils/requireTasks``` and ```index.js``` in any of the provided tasks folders for how to do this.

### Inline Tasks
You can add tasks inline as follows...

acdc()
    .bind(tasks.flow),
    .bind(tasks.property)
    .run((dsl, cb) => {
        with(dsl) {
            cb(sequence([
                output(customer),
                get('details.title'),
                {
                    task: {
                        fn: function uppercase(input, ctx, cb) {
                            cb(null, input ? input.toUpperCase() : input)
                        }
                    }
                },
                set('title')
            ]))
        }
    })
    .done(done)
```

