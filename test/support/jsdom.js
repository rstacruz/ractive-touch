var blacklist = Object.keys(global);

module.exports = function (next) {
  require('jsdom').env({
    html: "<!doctype html><html><head><meta charset='utf-8'></head><body></body></html>",
    done: function (errors, window) {
      for (var key in window) {
        if (!window.hasOwnProperty(key)) continue;
        if (~blacklist.indexOf(key)) continue;
        global[key] = window[key];
      }

      window.console = global.console;
      next(errors);
    }
  });
};
