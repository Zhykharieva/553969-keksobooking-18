'use strict';

(function () {

  var PRICE_OF_HOUSING_ELEMENT = window.util.ADS_FORM.querySelector('#price');
  var TYPE_OF_HOUSING_OPTION_ELEMENT = window.util.ADS_FORM.querySelector('#type');
  var TIME_IN_ELEMENT = window.util.ADS_FORM.querySelector('#timein');
  var TIME_OUT_ELEMENT = window.util.ADS_FORM.querySelector('#timeout');
  var ROOMS_OPTION_ELEMENT = window.util.ADS_FORM.querySelector('#room_number');
  var ROOMS_CAPACITY_ELEMENT = window.util.ADS_FORM.querySelector('#capacity');
  var TITLE_ELEMENT = window.util.ADS_FORM.querySelector('#title');
  var SUBMIT_ELEMENT = window.util.ADS_FORM.querySelector('.ad-form__submit');
  var RESET_BUTTON_ELEMENT = window.util.ADS_FORM.querySelector('.ad-form__reset');
  var SUCCESS_MESSAGE_ELEMENT = document.querySelector('#success')
  .content
  .querySelector('.success');
  var resultSuccessElement = SUCCESS_MESSAGE_ELEMENT.cloneNode(true);
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var AVATAR_START_SRC = 'img/muffin-grey.svg';
  var CONTAINER_AVATAR_ELEMENT = window.util.ADS_FORM.querySelector('.ad-form-header__preview');
  var PREVIEW_ELEMENT = window.util.ADS_FORM.querySelector('.ad-form-header__preview img');
  var START_COORD_X = 538;
  var START_COORD_Y = 407;
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

  var createErrorBorder = function (element) {
    var errorField = document.querySelector('#' + element.id + '+ .error-validate');

    if (!errorField) {
      var templateError = document.createDocumentFragment();
      errorField = document.createElement('div');

      errorField.classList.add('error-validate');
      templateError.appendChild(errorField);
      element.after(templateError);
    }

    element.style.border = '1px solid red';
    element.style.boxShadow = '0 0 3px red';
  };

  var removeErrorBorder = function (element) {
    var errorField = document.querySelector('#' + element.id + '+ .error-validate');

    if (errorField) {
      errorField.remove();
      element.style.border = 'none';
      element.style.boxShadow = 'none';
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

  var removePhotos = function (elem) {
    PREVIEW_ELEMENT.src = AVATAR_START_SRC;
    var pictures = elem.querySelectorAll('img');
    if (pictures) {
      pictures.forEach(function (picture) {
        picture.remove();
      });
    }
    CONTAINER_AVATAR_ELEMENT.appendChild(PREVIEW_ELEMENT);
  };

  var setMainPinDefaultCoord = function () {
    window.util.MAIN_PIN.style.left = (START_COORD_X + window.util.MAIN_PIN_HALF_WIDTH) + 'px';
    window.util.MAIN_PIN.style.top = (START_COORD_Y - window.util.MAIN_PIN_HALF_HEIGHT) + 'px';
    window.util.ADDRESS.value = START_COORD_X + ', ' + START_COORD_Y;
  };

  var resetForm = function () {
    window.util.ADS_FORM.reset();
    window.map.clean();
    window.mainPin();
    window.util.MAP.classList.add('map--faded');
    window.util.ADS_FORM.classList.add('ad-form--disabled');
    removePhotos(window.util.ADS_FORM);
    removeErrorBorder(TITLE_ELEMENT);
    removeErrorBorder(PRICE_OF_HOUSING_ELEMENT);
    removeErrorBorder(ROOMS_CAPACITY_ELEMENT);
    setMainPinDefaultCoord();
  };

  var onFormResetButtonPress = function (evt) {
    evt.preventDefault();
    resetForm();
  };

  var onSuccessMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      resultSuccessElement.remove(resultSuccessElement);
    }
  };

  var onSuccessMessageClick = function (evt) {
    var SUCCESS_MESSAGE_TEXT = document.querySelector('.success__message');
    if (evt.target !== SUCCESS_MESSAGE_TEXT) {
      resultSuccessElement.remove(resultSuccessElement);
    }
  };

  var showSuccessMessage = function () {
    window.util.MAIN.insertBefore(resultSuccessElement, window.util.MAP);
    if (resultSuccessElement) {
      resultSuccessElement.setAttribute('tabindex', -1);
      resultSuccessElement.focus();
    }
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClick);
  };

  var showSuccessValidation = function () {
    removeErrorBorder(ROOMS_CAPACITY_ELEMENT);
    ROOMS_CAPACITY_ELEMENT.setCustomValidity('');
  };

  var validateField = function (message, elem) {
    elem.setCustomValidity(message);
    removeErrorBorder(elem);
    createErrorBorder(elem);
  };

  var validateFieldsOfForm = function (elem) {
    if (elem.checkValidity()) {
      removeErrorBorder(elem);
    } else {
      elem.addEventListener('invalid', function () {
        createErrorBorder(elem);
      }, false);
    }
  };

  var onCountGuestsChange = function () {
    var selectedCapacity = ROOMS_CAPACITY_ELEMENT.options[ROOMS_CAPACITY_ELEMENT.selectedIndex];
    var selectedRoom = ROOMS_OPTION_ELEMENT.options[ROOMS_OPTION_ELEMENT.selectedIndex].value;
    var currentCapacityValue = parseInt((selectedCapacity.value), 10);
    var message = CAPACITY_OF_ROOMS[selectedRoom];

    if (selectedRoom === '100') {
      return currentCapacityValue !== 0 ? validateField(message, ROOMS_CAPACITY_ELEMENT) : showSuccessValidation(ROOMS_CAPACITY_ELEMENT);
    } else {
      return selectedRoom < currentCapacityValue || currentCapacityValue === 0 ? validateField(message, ROOMS_CAPACITY_ELEMENT) : showSuccessValidation(ROOMS_CAPACITY_ELEMENT);
    }
  };

  var setHousingOptionChange = function () {
    var type = TYPE_OF_HOUSING_OPTION_ELEMENT.value;
    var currentType = MIN_PRICE_OF_ACCOMMONDATION_MAP[type];
    PRICE_OF_HOUSING_ELEMENT.setAttribute('min', currentType);
    PRICE_OF_HOUSING_ELEMENT.setAttribute('placeholder', currentType);

  };

  var onFormEventListen = function () {
    setHousingOptionChange();
    validateFieldsOfForm(PRICE_OF_HOUSING_ELEMENT);
    validateFieldsOfForm(TITLE_ELEMENT);
    onCountGuestsChange();
  };

  window.util.ADS_FORM.addEventListener('submit', function (evt) {
    window.load(new FormData(window.util.ADS_FORM), 'POST', UPLOAD_URL, showSuccessMessage, window.error);
    evt.preventDefault();
    resetForm();
  });

  SUBMIT_ELEMENT.addEventListener('click', onFormEventListen);
  RESET_BUTTON_ELEMENT.addEventListener('click', onFormResetButtonPress);
  syncТimeInAndOut(TIME_IN_ELEMENT, TIME_OUT_ELEMENT);

})();
