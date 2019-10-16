'use strict';

(function () {
  var ERROR_MESSAGE = document.querySelector('#error')
  .content
  .querySelector('.error');
  var MAIN = document.querySelector('main');
  window.error = function () {
    var resultElement = ERROR_MESSAGE.cloneNode(true);
    return MAIN.insertBefore(resultElement, window.Uint8ClampedArray.MAP);
  };

})();
