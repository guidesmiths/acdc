var _ = require('lodash')

module.exports = function shorthand(task) {
    return _.extend(function() {
        return {
            task: task,
            params: _.zipObject(_.keys(task.schema.describe().children.params.children), arguments)
        }
    }, task)
}