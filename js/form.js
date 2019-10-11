'use strict';

(function () {
  var ADS_FORM = document.querySelector('.ad-form');
  var ADDRESS = ADS_FORM.querySelector('#address');
  var PRICE_OF_HOUSING = ADS_FORM.querySelector('#price');
  var TYPE_OF_HOUSING_OPTION = ADS_FORM.querySelector('#type');
  var MAP_FILTERS = document.querySelector('.map__filters');
  var FORMS_FIELDS = ADS_FORM.querySelectorAll('fieldset');
  var MAP_FILTERS_FIELDS = MAP_FILTERS.querySelectorAll('select');
  var TIME_IN = ADS_FORM.querySelector('#timein');
  var TIME_OUT = ADS_FORM.querySelector('#timeout');
  var ROOMS_OPTION = ADS_FORM.querySelector('#room_number');
  var ROOMS_CAPACITY = ADS_FORM.querySelector('#capacity');
  var SUBMIT = ADS_FORM.querySelector('.ad-form__submit');
  var MAIN_PIN = window.MAP.querySelector('.map__pin--main');
  var MAIN_PIN_HALF_WIDTH = MAIN_PIN.offsetWidth / 2;
  var MAIN_PIN_HEIGHT = MAIN_PIN.offsetHeight;
  var MAIN_PIN_HALF_HEIGHT = Math.floor(MAIN_PIN_HEIGHT / 2);
  var inactiveMode = true;
  var MIN_PRICE_OF_ACCOMMONDATION_MAP = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };
  var CAPACITY_OF_ROOMS = {
    '1': 'для 1 гостя',
    '2': 'для 2 гостей или для 1 гостя',
    '3': 'для 3 гостей, для 2 гостей или для 1 гостя',
    '100': 'не для гостей',
  };
  var getCoordInactivePin = function () {
    return {
      x: Math.floor(parseInt((MAIN_PIN.style.left), 10) - MAIN_PIN_HALF_WIDTH),
      y: Math.floor(parseInt((MAIN_PIN.style.top), 10) + MAIN_PIN_HALF_HEIGHT),
    };

  };

  var setFieldAddress = function () {
    var getResultCoords = getCoordInactivePin();
    ADDRESS.value = inactiveMode ? getResultCoords.x + ', ' + getResultCoords.y : getResultCoords.x + ', ' + (getResultCoords.y + MAIN_PIN_HALF_HEIGHT);
  };

  var removeFieldDisabled = function (data) {
    data.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });
  };

  var setInactiveMode = function () {
    inactiveMode = true;
    setFieldDisabled(FORMS_FIELDS);
    setFieldDisabled(MAP_FILTERS_FIELDS);
    setFieldAddress();
  };


  var onMainPinPress = function () {
    if (inactiveMode) {
      inactiveMode = false;
      setFieldAddress();
      window.MAP.classList.remove('map--faded');
      removeFieldDisabled(FORMS_FIELDS);
      removeFieldDisabled(MAP_FILTERS_FIELDS);
      ADS_FORM.classList.remove('ad-form--disabled');
      window.createPinsList();
    }
  };

  var syncТimeInAndOut = function (timein, timeout) {
    timein.addEventListener('change', function (evt) {
      timeout.value = evt.target.value;
    });
    timeout.addEventListener('change', function (evt) {
      timein.value = evt.target.value;
    });
  };

  var onHousingOptionChange = function () {
    var type = TYPE_OF_HOUSING_OPTION.value;
    var currentType = MIN_PRICE_OF_ACCOMMONDATION_MAP[type];
    PRICE_OF_HOUSING.setAttribute('min', currentType);
    PRICE_OF_HOUSING.setAttribute('placeholder', currentType);

  };

  var onCountGuestsChange = function () {
    var selectedCapacity = ROOMS_CAPACITY.options[ROOMS_CAPACITY.selectedIndex];
    var selectedRoom = ROOMS_OPTION.options[ROOMS_OPTION.selectedIndex].value;
    var currentCapacityValue = parseInt((selectedCapacity.value), 10);
    var message = CAPACITY_OF_ROOMS[selectedRoom];
    if (selectedRoom === '100') {
      return currentCapacityValue !== 0 ? ROOMS_CAPACITY.setCustomValidity(message) : ROOMS_CAPACITY.setCustomValidity('');
    } else {
      return selectedRoom < currentCapacityValue || currentCapacityValue === 0 ? ROOMS_CAPACITY.setCustomValidity(message) : ROOMS_CAPACITY.setCustomValidity('');
    }
  };

  var setFieldDisabled = function (data) {
    data.forEach(function (elem) {
      elem.setAttribute('disabled', 'disabled');
    });
  };
  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE & !inactiveMode) {
      onMainPinPress();
    }
  };

  MAIN_PIN.addEventListener('mousedown', onMainPinPress);
  MAIN_PIN.addEventListener('keydown', onPopupEnterPress);
  TYPE_OF_HOUSING_OPTION.addEventListener('click', onHousingOptionChange);
  SUBMIT.addEventListener('click', onCountGuestsChange);

  setInactiveMode();
  syncТimeInAndOut(TIME_IN, TIME_OUT);
})();
