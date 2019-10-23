'use strict';

(function () {

  var ERROR_MESSAGE = document.querySelector('#error')
  .content
  .querySelector('.error');


  var resultElement = ERROR_MESSAGE.cloneNode(true);
  var onErrrorMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      resultElement.remove(resultElement);
    }
  };


  window.error = function () {
    window.util.MAIN.insertBefore(resultElement, window.util.MAP);
    document.addEventListener('keydown', onErrrorMessageEscPress);
    document.addEventListener('click', function (evt) {
      var ERROR_MESSAGE_TEXT = document.querySelector('.error__message');
      if (evt.target !== ERROR_MESSAGE_TEXT) {
        resultElement.remove(resultElement);
      }
    });
  };


})();
