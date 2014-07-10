var uidPrefix = process.pid;
var uid = 0;
var log = console;

Bracket = function(handler) {
  if (!handler) throw new Error('Handler must be provided');
  this.handler = handler;
  this.current = null;
}

Bracket.ProfilingHandler = require('./handlers/profiling');

Bracket.uid = function() {
  return [uidPrefix, ++uid].join(':');
}

Bracket.prototype = {
  reset: function() {
    this.current = null;
    this.handler.reset();
  },

  open: function(id, data) {
    var sub = {};
    sub.id = id || Bracket.uid();
    sub.previous = this.current;
    sub.data = data;
    this.current = sub;
    this.handler.open(sub);
    return sub.id;
  },

  close: function(id) {
    if (!this.current) return false;
    if (id && id != this.current.id) {
      this.handler.discard(this.current);
      this.current = this.current.previous;
      return this.close(id);
    }
    var target = this.current;
    this.current = target.previous;
    return this.handler.close(target);
  },

  tap: function(id) {
    if (!this.current) return false;
    if (!id) return this.handler.tap(this.current);
    var target = this.current;
    do {
      if (target.id == id) return this.handler.tap(target);
    } while (target = target.previous)
  }
}

module.exports = Bracket;
