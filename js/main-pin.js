'use strict';

(function () {
  var inactiveMode = true;
  var FORMS_FIELDS_ELEMENT = window.util.ADS_FORM.querySelectorAll('fieldset');
  var MAP_FILTERS_ELEMENT = document.querySelector('.map__filters');
  var MAP_FILTERS_FIELDS_ELEMENT = MAP_FILTERS_ELEMENT.querySelectorAll('select');

  var getCoordInactivePin = function () {
    return {
      x: Math.floor(parseInt((window.util.MAIN_PIN.style.left), 10) - window.util.MAIN_PIN_HALF_WIDTH),
      y: Math.floor(parseInt((window.util.MAIN_PIN.style.top), 10) + window.util.MAIN_PIN_HALF_HEIGHT),
    };

  };

  var setFieldAddress = function () {
    var getResultCoords = getCoordInactivePin();
    window.util.ADDRESS.value = inactiveMode ? getResultCoords.x + ', ' + getResultCoords.y : getResultCoords.x + ', ' + (getResultCoords.y + window.util.MAIN_PIN_HALF_HEIGHT);
  };

  var setFieldDisabled = function (data) {
    data.forEach(function (elem) {
      elem.setAttribute('disabled', 'disabled');
    });
  };

  var removeFieldDisabled = function (data) {
    data.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });
  };

  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE & !inactiveMode) {
      onMainPinPress();
    }
  };

  var onMainPinPress = function () {
    if (inactiveMode) {
      inactiveMode = false;
      window.util.MAP.classList.remove('map--faded');
      removeFieldDisabled(FORMS_FIELDS_ELEMENT);
      removeFieldDisabled(MAP_FILTERS_FIELDS_ELEMENT);
      window.util.ADS_FORM.classList.remove('ad-form--disabled');
      window.map.load();
      window.util.MAIN_PIN.removeEventListener('mousedown', onMainPinPress);
      window.util.MAIN_PIN.removeEventListener('keydown', onPopupEnterPress);
    }
  };

  window.mainPin = function () {
    inactiveMode = true;
    setFieldDisabled(FORMS_FIELDS_ELEMENT);
    setFieldDisabled(MAP_FILTERS_FIELDS_ELEMENT);
    MAP_FILTERS_ELEMENT.reset();
    setFieldAddress();
  };

  window.util.MAIN_PIN.addEventListener('click', onMainPinPress);
  window.util.MAIN_PIN.addEventListener('keydown', onPopupEnterPress);
  window.mainPin();
})();
