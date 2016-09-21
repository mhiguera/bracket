bracket
=======

Bracketing made easy.
Open a bracket and take a snapshot, you may want to close it (and evaluate differences) o tap it (ongoing evaluate it) whilst it is still opened [*Image needed*].

You may need a handler to do your evaluations. Bracket (version 0.0.1) is provided with just a handler --but an illustrative one! The ProfilingHandler (see example below) gives you information about subs' elapsed time (both closing a bracket and tapping it).

Changelog
=========

**0.0.5** 

* Added ```setLogger``` to ```Bracket.ProfilingHandler```
* Minor bugfixes

**0.0.2** 

* ```Bracket.ProfilingHandler``` now admits an ```options``` argument making it easy to change the default configuration for brackets created using that particular handler.


Example
=======

At this very premature stage of *bracket*:

```javascript
var Bracket = require('./bracket');
var _console = {
  warn:  function() { console.warn.call(console,  'WARN '.concat([].slice.call(arguments))) },
  info:  function() { console.info.call(console,  'INFO '.concat([].slice.call(arguments))) },
  debug: function() { console.info.call(console, 'DEBUG '.concat([].slice.call(arguments))) }
}
var handler = new Bracket.ProfilingHandler({
  logger: _console,
  threshold: {
    warn: 50,
    info: 10
  }
});

var bracket = new Bracket(handler);

var total = 10;
var i = total;
var testName = 'Iteration test';
function test() {
  var rand = Math.round(Math.random() * 10);
  var id = 'Iterations left: ' + i;
  bracket.open(id);
  setTimeout(function() {
    bracket.tap(testName);
    bracket.close();
    if (--i) test();
    else {
      bracket.close(testName);
    }
  }, rand);
}

bracket.open(testName, { threshold: { warn: 200, info: 75 } });
test();
```


Would output something like:

```
DEBUG Iteration test
DEBUG Iterations left: 10
INFO (13ms) Iterations left: 10
DEBUG Iterations left: 9
DEBUG Iterations left: 8
DEBUG Iterations left: 7
DEBUG Iterations left: 6
DEBUG Iterations left: 5
DEBUG Iterations left: 4
DEBUG Iterations left: 3
INFO (10ms) Iterations left: 3
DEBUG Iterations left: 2
INFO (11ms) Iterations left: 2
DEBUG Iterations left: 1
INFO (77ms, 7.7ms/i) Iteration test
```

To-do
=====
* Better documentation and examples
* Create new handlers

License
=======

The MIT License (MIT)
Copyright (c) 2016 Manuel de la Higuera

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
