(function(global){
  'use strict';
    // Reference: https://gist.github.com/paulirish/1579671

  global = global || {};
  const prefix = ['ms','moz','webkit','o'];
  let requestAnimationFrame = global.requestAnimationFrame;
  let cancelAnimationFrame = global.cancelAnimationFrame;
  for (let i = 0; i < prefix.length && requestAnimationFrame; i++) {
    requestAnimationFrame = global[prefix[i]+'RequestAnimationFrame'];
    cancelAnimationFrame = global[prefix[i]+'CancelAnimationFrame']
                                || global[prefix[i]+'CancelRequestAnimationFrame'];
  }

  let lastTime = 0;
  requestAnimationFrame = requestAnimationFrame || function(callback) {
    let curTime = new Date().getTime();
    let wait = Math.max(0, 16 - (curTime - lastTime));
    let id = setTimeout(() => {
      callback(curTime + wait);
    }, wait);
    lastTime = curTime + wait;
    return id;
  };

  cancelAnimationFrame = cancelAnimationFrame || function(id) {
    return clearTimeout(id);
  };

  module.exports = {
    start: requestAnimationFrame,
    stop: cancelAnimationFrame,
        // cycle only support sync function.
    cycle: function(func) {
      return new Promise((resolve) => {
        let funcWrapper = function() {
          requestAnimationFrame(time => {
            let next = func(time);
            if (next) {
              funcWrapper();
            } else {
              resolve();
            }
          });
        };
        funcWrapper();
      });
    }
  };
})(typeof window === 'undefined' ? window : this);
