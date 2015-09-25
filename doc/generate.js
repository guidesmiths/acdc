var tasks = require('../lib/tasks')
var fs = require('fs')
var path = require('path')
var template = fs.readFileSync(path.join(__dirname, 'tasks.mustache')).toString()
var shorthand = require('../lib/utils/shorthand')
var acdc = require('..')

var describe = shorthand({
    fn: function describe(input, ctx, cb) {
        cb(null, input.schema ? input.schema.describe() : undefined)
    }
})

acdc()
    .bind(tasks.flow)
    .bind(tasks.logic)
    .bind(tasks.property)
    .bind(tasks.array)
    .bind(tasks.collection)
    .bind(tasks.hogan)
    .run(function(dsl, cb) {
        with(dsl) {
            cb(sequence([
                output({
                    logic: tasks.logic
                }),
                map(sequence([
                    fork([
                        copy('key', 'library'),
                        sequence([
                            get('value'),
                            map(sequence([
                                fork([
                                    copy('key', 'name'),
                                    sequence([
                                        transform('value', describe(), 'schema'),
                                        fork([
                                            copy('schema.children.input', 'input'),
                                            sequence([
                                                get('schema.children.params.children'),
                                                map(sequence([
                                                    fork([
                                                        copy('key', 'name'),
                                                        copy('value', 'value')
                                                    ]),
                                                    merge()
                                                ])),
                                                set('params')
                                            ])
                                        ]),
                                        merge(),
                                    ])
                                ]),
                                merge()
                            ])),
                            set('tasks')
                        ])
                    ]),
                    merge()
                ])),
                set('libraries'),
                render(template)
            ]))
        }
    }).done(function(err, result) {
        if (err) throw err
        fs.writeFileSync(path.join(__dirname, 'api.md'), result)
    })

