var format = require('util').format;
Handler = function(logger) {
  this.logger = logger || console;
}

Handler.defaults = {
  threshold: {
    info: 100,
    warn: 500
  }
}

Handler.prototype = {
  reset: function() {},
  open: function(sub) {
    sub.snapshot = this.getSnapshot();
    if (this.logger == console) this.logger.log(sub.id);
    else this.logger.debug(sub.id);
  },

  logLevel: function(sub, elapsedTime) {
    var defaults = Handler.defaults.threshold;
    var warn = defaults.warn;
    var info = defaults.info;
    var _warn = null;
    var _info = null;
    try {
      _warn = sub.data.threshold.warn;
      _info = sub.data.threshold.info;
    } catch(err) {
      // do nothing
    }
    warn = (null !== _warn)? _warn : warn;
    info = (null !== _info)? _info : info;
    if (elapsedTime >= warn) return 'warn';
    if (elapsedTime >= info) return 'info';
    return null;
  },

  close: function(sub) {
    var elapsedTime = Date.now() - sub.snapshot.timestamp;
    var level = this.logLevel(sub, elapsedTime);
    if (!level) return false;
    var message;
    if (sub.taps) {
      var average = Math.round(elapsedTime/sub.taps.length * 100)/100;
      message = format('(%dms, %dms/i) %s', elapsedTime, average, sub.id); 
    }else message = format('(%dms) %s', elapsedTime, sub.id);
    this.logger[level](message);
    return true;
  },

  discard: function(sub) {
    this.logger.warn(format('(Discarded) %s',sub.id));
  },

  tap: function(sub) {
    var from = (sub.taps)? sub.taps[sub.taps.length - 1] : sub.snapshot;
    var elapsedTime = Date.now() - from.timestamp;
    sub.taps = sub.taps || [];
    sub.taps.push(this.getSnapshot());
    var level = this.logLevel(sub, elapsedTime);
    if (!level) return false;
    var message = format('(+%dms) %s', elapsedTime, sub.id);
    this.logger[level](message);
    return true;
  },

  getSnapshot: function() {
    var snapshot = {};
    snapshot.timestamp = Date.now();
    return snapshot;
  }
}

module.exports = Handler;
