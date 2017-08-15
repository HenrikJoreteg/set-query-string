# set-query-string

Updates/sets the browser's query string in-place without adding to browser history (unless you want to, of course).

This module uses HTML5's [`history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history#The_replaceState()_method) to manipulate the query string on the page without refreshing the page.  

If not supported in your browser it's just a no-op.

This is just a thin wrapper on top of the awesome and tiny [`query-string`](https://www.npmjs.com/package/query-string) module.

## Why would you want this?

Sometimes you want to let the user apply filters to data in your Native Web App (a.k.a. Single Page App) and still make those filters deep-linkable. So what do you do?

Serialize your filter description into the URL: `awesome-app.com?color=blue&search=hair`

Now the user can deep link or bookmark specific filtered views.

In browsers that don't support `replaceState` using this simply does nothing so your app still works, users simply can't deep-link your filtered views ¯\_(ツ)_/¯.

## Why bother making it a module?

Because it's nice to just be able to set an object and have it Just Work™ without having to think about installing a query string parser, etc.

Also, this automatically URI encodes/decodes values so you can use spaces and whatnot without having to think about it.

## install

```
npm install set-query-string
```

## example

```javascript
var setQuery = require('set-query-string');

// the browser's URL will be updated
// in place without a page refresh:

// before: `example.com`
setQuery({something: 'else'})
// after: `example.com?something=else`

// by default any other query strings are left in place
// before: `example.com?something=else`
setQuery({other: 'value'})
// after: `example.com?something=else&other=value`

// you can optionally clear other values too
// before: `example.com?something=else`
setQuery({other: 'value'}, {clear: true})
// after: `example.com?other=value`

// by default it uses `history.replaceState` so
// the changed URL doesn't end up being part of the
// "back" button history. If you *do* want to add
// to it, just pass a `pushState: true` option
setQuery({other: 'value'}, {pushState: true})

// setting values to anything falsy other than `0` removes that key
// from the query entirely.
// if there's no keys left, the `?` is removed too
// before: `example.com?other=something`
// these are all the same
setQuery({other: ''})
setQuery({other: undefined})
setQuery({other: null})
// after: `example.com`

// if for some reason you want to encode the string yourself
// go for it, just pass it a string instead of an object
var myQueryString = '?im-special=yup'
// this works too, if you really want it (always replaces the entire query string)
// it ignores leading `?` if you include it, so it's safe to do it either way
setQuery(myQueryString)

// setting query string and adding to history state
setQuery({other: 'value'}, {pushState: true, state: {other: 'value'}})

```

## binding to model property

If you happen to be using something like [ampersand-state](http://ampersandjs.com/docs#ampersand-state) you can use this module to easily bind a model property to a certain query paramater quite easily:

```javascript
import State from 'ampersand-state'
import setQuery from 'set-query-string'

export default State.extend({
  initialize () {
    // bind `query` property to browser URL query
    this.on('change:query', (model) => setQuery({query: model.query}))
  },

  session: {
    query: 'string'
  }
})

```

## tests?

Works well in the apps I use it in. I'd happily take a PR that added some but it's simple enough and don't have the time right now ¯\_(ツ)_/¯

## credits

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## changelog

- `2.1.0`: now inert if required in non browser environment
- `2.0.0`: use smaller, simpler `query-string` instead of `qs`
- `1.0.0`: initial release

## license

MIT
