# web-storage [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]
> Making it easier to interact with Web Storage.

## Highlights
* Minimal wrapper around `localStorage` and `sessionStorage`.  Small footprint.
* Getter/Setter based.
* You can forget about seralization errors.
* You can use it with any framework.
* Provides in-memory storage if `localStorage` or `sessionStorage` aren't available.
* CommonJS format.  Really easy to use with browserify.
* You can configure the seralization methods, I.E. `parse` and `stringify`, in the config.

## Dealing with some data

```javascript
var localStorage = require('web-storage')().localStorage;
var circular = {};
circular.circular = circular;

//window.localStorage.foo = JSON.stringify(circular);//This throws errors
localStorage.set('foo', circular);//Returns false, unsuccessful
localStorage.get('foo');//Returns undefined

localStorage.set('boo', 5);//returns true, successful
localStorage.get('boo');//returns 5;
localStorage.remove('boo');
localStorage.get('boo');//returns undefined;
```

## Custom serialization
```javascript
var localStorage = require('web-storage')({
    parse: function() {return 'idk';}
  }).localStorage;

localStorage.set('foo', 5);
window.localStorage.foo;//equals 'idk'
```

##LICENSE
``````
The MIT License (MIT)

Copyright (c) 2014 Joseph Spencer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
``````

[downloads-image]: http://img.shields.io/npm/dm/web-storage.svg
[npm-url]: https://npmjs.org/package/web-storage
[npm-image]: http://img.shields.io/npm/v/web-storage.svg

[travis-url]: https://travis-ci.org/jsdevel/node-web-storage
[travis-image]: http://img.shields.io/travis/jsdevel/node-web-storage.svg

[coveralls-url]: https://coveralls.io/r/jsdevel/node-web-storage
[coveralls-image]: http://img.shields.io/coveralls/jsdevel/node-web-storage/master.svg
