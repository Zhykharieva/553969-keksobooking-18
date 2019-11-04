'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MAP_ELEMENT = document.querySelector('.map');
  var MAIN_PIN_ELEMENT = MAP_ELEMENT.querySelector('.map__pin--main');
  var MAIN_PIN_HALF_WIDTH = MAIN_PIN_ELEMENT.offsetWidth / 2;
  var MAIN_PIN_HEIGHT = MAIN_PIN_ELEMENT.offsetHeight;
  var MAIN_PIN_HALF_HEIGHT = Math.floor(MAIN_PIN_HEIGHT / 2);
  var ADDRESS_ELEMENT = document.querySelector('#address');
  var ADS_FORM_ELEMENT = document.querySelector('.ad-form');
  var MAIN_ELEMENT = document.querySelector('main');
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
    MAP: MAP_ELEMENT,
    MAIN: MAIN_ELEMENT,
    MAIN_PIN: MAIN_PIN_ELEMENT,
    MAIN_PIN_HALF_WIDTH: MAIN_PIN_HALF_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_HALF_HEIGHT: MAIN_PIN_HALF_HEIGHT,
    ADDRESS: ADDRESS_ELEMENT,
    ADS_FORM: ADS_FORM_ELEMENT,
    debounce: removeBlink,

  };

})();
