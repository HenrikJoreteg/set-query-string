# set-query-string

Updates/sets the browser's query string in-place without adding to browser history (unless you want to, of course).

This module uses HTML5's [`history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history#The_replaceState()_method) to manipulate the query string on the page without refreshing the page.  

If not supported in your browser it's just a no-op.

This is just a thin wrapper on top of the awesome [`qs`](https://www.npmjs.com/package/qs) module, so any options you pass that aren't for this module just get passed through as options to `qs`.

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

// setting values to `undefined` removes that key
// from the query entirely.
// if there's no keys left, the `?` is removed too
// before: `example.com?other=something`
setQuery({other: undefined})
// after: `example.com`

// if for some reason you want to encode the string yourself
// go for it, just pass it a string instead of an object
var myQueryString = '?im-special=yup'
// this works too, if you really want it (always replaces the entire query string)
setQuery(myQueryString)

```

## encoding options

This is just a thin wrapper on top of [`qs`](https://www.npmjs.com/package/qs) so the options object just gets passed straight through to `qs`.

## tests? 

Works well in the apps I use it in. I'd happily take a PR that added some but it's simple enough and don't have the time right now ¯\_(ツ)_/¯

## credits

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## license

MIT

