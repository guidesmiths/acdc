var _ = require('lodash')

module.exports = function(path) {
    return require('require-all')({
        dirname: path,
        filter: /^(?!index\.js$)(.+)\.js$/,
        resolve: function(task) {
            return _.extend(function() {
                return {
                    task: task,
                    params: _.zipObject(_.keys(task.schema.describe().children.params.children), arguments)
                }
            }, task)
        }
    })
}