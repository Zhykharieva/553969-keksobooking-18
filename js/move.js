'use strict';
(function () {
  var MIN_Y = 130 - window.util.MAIN_PIN_HEIGHT;
  var MAX_Y = 630 - window.util.MAIN_PIN_HEIGHT;
  var limitsX = {

    xMax: (window.util.MAP.style.left + window.util.MAP.offsetWidth) - window.util. MAIN_PIN_HALF_WIDTH,
    xMin: window.util.MAP.style.left - window.util.MAIN_PIN_HALF_WIDTH
  };

  var applyLimits = function () {
    if (window.util.MAIN_PIN.offsetLeft < limitsX.xMin) {
      window.util.MAIN_PIN.style.left = limitsX.xMin + 'px';
    } else if (window.util.MAIN_PIN.offsetLeft > limitsX.xMax) {
      window.util.MAIN_PIN.style.left = limitsX.xMax + 'px';
    }
    if (window.util.MAIN_PIN.offsetTop < MIN_Y) {
      window.util.MAIN_PIN.style.top = MIN_Y + 'px';
    } else if (window.util.MAIN_PIN.offsetTop > MAX_Y) {
      window.util.MAIN_PIN.style.top = MAX_Y + 'px';
    }
  };

  var getResultCoord = function (shiftY, shiftX) {
    window.util.MAIN_PIN.style.top = (window.util.MAIN_PIN.offsetTop - shiftY) + 'px';
    window.util.MAIN_PIN.style.left = (window.util.MAIN_PIN.offsetLeft - shiftX) + 'px';
  };

  var getPinsAddress = function () {
    window.util.ADDRESS.value = parseInt((window.util.MAIN_PIN.style.left), 10) + ', ' + (parseInt((window.util.MAIN_PIN.style.top), 10) + window.util.MAIN_PIN_HEIGHT);
  };

  window.util.MAIN_PIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoords.x - moveEvt.clientX;
      var shiftY = startCoords.y - moveEvt.clientY;


      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      getResultCoord(shiftY, shiftX);
      applyLimits();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getPinsAddress();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };


    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  });


})();
