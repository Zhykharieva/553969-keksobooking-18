'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MAP = document.querySelector('.map');
  var MAIN_PIN = MAP.querySelector('.map__pin--main');
  var MAIN_PIN_HALF_WIDTH = MAIN_PIN.offsetWidth / 2;
  var MAIN_PIN_HEIGHT = MAIN_PIN.offsetHeight;
  var MAIN_PIN_HALF_HEIGHT = Math.floor(MAIN_PIN_HEIGHT / 2);
  var ADDRESS = document.querySelector('#address');
  var MAIN = document.querySelector('main');
  var DEBOUNCE_INTERVAL = 500;

  var removeBlink = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    MAP: MAP,
    MAIN: MAIN,
    MAIN_PIN: MAIN_PIN,
    MAIN_PIN_HALF_WIDTH: MAIN_PIN_HALF_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_HALF_HEIGHT: MAIN_PIN_HALF_HEIGHT,
    ADDRESS: ADDRESS,
    debounce: removeBlink,

  };

})();
