var qs = require('qs')
var replaceState = window && window.history && window.history.replaceState
var pushState = window && window.history && window.history.pushState

if (!replaceState) {
  module.exports = function () {}
} else {
  module.exports = function (newQuery, options) {
    options || (options = {})
    var isEmpty = !newQuery
    var isString = !isEmpty && typeof newQuery === 'string'
    // whether to clear existing, any time a string is
    // already given we'll just set that as new query
    var clear = options.clear || isString
    // history function to use
    var historyFunc = options.pushState ? pushState : replaceState
    // the new query object, (we start with existing if not `clear:true`)
    var queryObj = clear ? {} : qs.parse(window.location.search.slice(1), options)
    var newString

    if (!isEmpty && !isString) {
      for (var key in newQuery) {
        queryObj[key] = newQuery[key]
      }
      newString = qs.stringify(queryObj, options)
    } else {
      newString = newQuery || ''
    }

    // only add the `?` if we've got something
    if (newString.length && newString.charAt(0) !== '?') {
      newString = '?' + newString
    }

    historyFunc.call(window.history, window.history.state, '', window.location.pathname + (newString || ''))
  }
}
