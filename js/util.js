'use strict';

(function () {
  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;
  window.getRandomBetween = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.generateRandomNumberArray = function (limit, max) {
    var arr = [];
    for (var i = 0; i < limit; i++) {
      arr.push(window.getRandomBetween(1, max));
    }
    return arr;
  };

  window.createNumberedList = function (count, prefix, suffix) {
    var arr = [];
    for (var i = 1; i <= count; i++) {
      arr.push(prefix + i + suffix);
    }
    return arr;
  };

  window.getRandomElement = function (arr) {
    return arr[window.getRandomBetween(0, arr.length - 1)];
  };


  window.getRandomSlice = function (arr) {
    return arr.slice(window.getRandomBetween(0, arr.length - 1));
  };

  window.spliceRandomElem = function (arr) {
    return arr.splice(window.getRandomElement(arr), 1);
  };
})();
