var R = require('ramda')

module.exports = function isArrayLike(x) {
    if (R.type(x) === 'Array') { return true; }
    if (!x) { return false; }
    if (typeof x !== 'object') { return false; }
    if (R.type(x) === 'String') { return false; }
    if (x.nodeType === 1) { return !!x.length; }
    if (x.length === 0) { return true; }
    if (x.length > 0) {
        return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
    }
    return false;
}
