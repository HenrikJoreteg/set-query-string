var qs = require('query-string')
var replaceState
var pushState

if (typeof window !== 'undefined') {
  replaceState = window && window.history && window.history.replaceState
  pushState = window && window.history && window.history.pushState
}

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
    var queryObj = clear ? {} : qs.parse(window.location.search)
    var newString

    if (!isEmpty && !isString) {
      for (var key in newQuery) {
        var value = newQuery[key]
        // delete new falsy values, except number 0
        if (!value && value !== 0) {
          delete queryObj[key]
        } else {
          queryObj[key] = newQuery[key]
        }
      }
      newString = qs.stringify(queryObj)
    } else {
      newString = newQuery || ''
    }

    // only add the `?` if we've got something
    if (newString.length && newString.charAt(0) !== '?') {
      newString = '?' + newString
    }

    historyFunc.call(window.history, options.state || window.history.state, '', window.location.pathname + (newString || ''))
  }
}
