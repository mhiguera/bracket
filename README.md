bracket
=======

Bracketing made easy.
Open a bracket and take a snapshot, you may want to close it (and evaluate differences) o tap it (ongoing evaluate it) whilst it is still opened [*Image needed*].

You may need a handler to do your evaluations. Bracket (version 0.0.1) is provided with just a handler --but an illustrative one! The ProfilingHandler (see example below) gives you information about subs' elapsed time (both closing a bracket and tapping it).


Example
=======

At this very premature stage of *bracket*:

```
var Bracket = require('bracket');
var handler = new Bracket.ProfilingHandler(console);
var bracket = new Bracket(handler);

var handlerOptions = { 
  threshold: {
    warn: 30,
    info: 0
  }
};


var total = 10;
var i = total;
var testName = 'Iteration test';
function test() {
  var rand = Math.round(Math.random() * 10);
  var id = 'Iterations left: ' + i;
  bracket.open(id, handlerOptions);
  setTimeout(function() {
    bracket.tap(testName);
    bracket.close();
    if (--i) test();
    else {
      bracket.close(testName);
    }
  }, rand);
}

bracket.open(testName, handlerOptions);
test();
```


Would output something like:

```
Iteration test
Iterations left: 10
(+13ms) Iteration test
(11ms) Iterations left: 10
Iterations left: 9
(+11ms) Iteration test
(10ms) Iterations left: 9
Iterations left: 8
(+6ms) Iteration test
(6ms) Iterations left: 8
Iterations left: 7
(+4ms) Iteration test
(5ms) Iterations left: 7
Iterations left: 6
(+10ms) Iteration test
(9ms) Iterations left: 6
Iterations left: 5
(+1ms) Iteration test
(1ms) Iterations left: 5
Iterations left: 4
(+4ms) Iteration test
(4ms) Iterations left: 4
Iterations left: 3
(+6ms) Iteration test
(6ms) Iterations left: 3
Iterations left: 2
(+1ms) Iteration test
(1ms) Iterations left: 2
Iterations left: 1
(+1ms) Iteration test
(2ms) Iterations left: 1
(58ms, 5.8ms/i) Iteration test
```

To-do
=====
* Better documentation and examples
* Create new handlers
