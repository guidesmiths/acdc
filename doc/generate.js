/* eslint-disable no-undef */
var tasks = require('../lib/tasks')
var fs = require('fs')
var path = require('path')
var template = fs.readFileSync(path.join(__dirname, 'tasks.mustache')).toString()
var shorthand = require('../lib/utils/shorthand')
var acdc = require('..')

var schema = shorthand({
    fn: function schema(input, ctx, cb) {
        cb(null, input ? input.describe() : undefined)
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
                output(tasks),
                map([
                    fork({
                        library: get('library'),
                        tasks: sequence([
                            get('tasks'),
                            map([
                                fork({
                                    task: get('name'),
                                    usage: sequence([
                                        transform('definition.schema', schema(), 'schema'),
                                        get('schema.meta[0].usage')
                                    ]),
                                    description: sequence([
                                        transform('definition.schema', schema(), 'schema'),
                                        get('schema.meta[0].description')
                                    ]),
                                    input: sequence([
                                        transform('definition.schema', schema(), 'schema'),
                                        fork({
                                            type: get('schema.children.input.type'),
                                            mandatory: sequence([
                                                get('schema.children.input.flags.presence'),
                                                choose([
                                                    when(eq('optional'), output('No')),
                                                    otherwise(output('Yes'))
                                                ])
                                            ])
                                        })
                                    ]),
                                    params: sequence([
                                        transform('definition.schema', schema(), 'schema'),
                                        get('schema.children.params.children'),
                                        map([
                                            fork({
                                                name: get('name'),
                                                type: get('param.type'),
                                                mandatory: sequence([
                                                    get('param.flags.presence'),
                                                    choose([
                                                        when(eq('optional'), output('No')),
                                                        otherwise(output('Yes'))
                                                    ])
                                                ]),
                                                default: get('param.flags.default')
                                            })
                                        ], 'name', 'param')
                                    ])
                                })
                            ], 'name', 'definition')
                        ])
                    })
                ], 'library', 'tasks'),
                set('libraries'),
                render(template)
            ]))
        }
    }).done(function(err, result) {
        if (err) throw err
        fs.writeFileSync(path.join(__dirname, 'api.md'), result)
    })
