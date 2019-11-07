'use strict';

(function () {
  var SIMILAR_LIST_ELEMENT = window.util.MAP.querySelector('.map__filters-container');
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var pinsList = [];
  var filteredPinsList = [];

  var removeElement = function () {
    var card = window.util.MAP.querySelector('.map__card');
    if (card) {
      card.remove(card);
    }
  };

  var onCardCreate = function (evt) {
    var elemId = evt.currentTarget.attributes.accommondationid.value;
    return window.util.MAP.insertBefore(window.card(pinsList[elemId]), SIMILAR_LIST_ELEMENT);
  };

  var deletePinsActiveClass = function () {
    var currentPin = window.util.MAP.querySelector('.map__pin--active');
    if (currentPin) {
      currentPin.classList.remove('map__pin--active');
    }
  };

  var onPopupClose = function () {
    deletePinsActiveClass();
    var buttonClose = window.util.MAP.querySelector('.popup__close');
    if (buttonClose.className === 'popup__close') {
      removeElement();
    }
    buttonClose.removeEventListener('click', onPopupClose);
  };

  var onEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      onPopupClose();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var onPinOpen = function (evt) {
    deletePinsActiveClass();
    removeElement();
    onCardCreate(evt);
    evt.currentTarget.classList.add('map__pin--active');
    var buttonClose = window.util.MAP.querySelector('.popup__close');
    document.addEventListener('keydown', onEscPress);
    buttonClose.addEventListener('click', onPopupClose);
  };

  var onEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      onPinOpen(evt);
    }
  };

  var removeAllPins = function () {
    window.util.MAP.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (elem) {
      elem.remove();
    });
  };

  var addPinEventListeners = function () {
    var pins = window.util.MAP.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (elem) {
      if (elem.className === 'map__pin') {
        elem.addEventListener('click', onPinOpen);
        elem.addEventListener('keydown', onEnterPress);
      }
    });
  };

  var initData = function (data) {
    filteredPinsList = data;
    pinsList = window.filter(data.slice());
    window.pin(pinsList);
    addPinEventListeners();
  };

  var changeFiltersFields = function () {
    initData(filteredPinsList);
  };

  window.map = {
    load: function () {
      window.load('', 'GET', LOAD_URL, initData, window.error);
    },
    clean: function () {
      removeElement();
      removeAllPins();
    },
    filterAfterLoad: changeFiltersFields,
  };

})();
