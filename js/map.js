'use strict';

(function () {
  var SIMILAR_LIST_ELEMENT = window.util.MAP.querySelector('.map__filters-container');
  var pinsArray = [];
  var filteredPinsList = [];
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var removeElement = function () {
    var card = window.util.MAP.querySelector('.map__card');
    if (card) {
      card.remove(card);
    }
  };

  var onCardCreate = function (evt) {
    var elemId = evt.currentTarget.attributes.accommondationId.value;
    return window.util.MAP.insertBefore(window.card(pinsArray[elemId]), SIMILAR_LIST_ELEMENT);
  };

  var onPinOpen = function (evt) {
    removeElement();
    onCardCreate(evt);
    evt.target.classList.add('map__pin--active');
    var buttonClose = window.util.MAP.querySelector('.popup__close');
    buttonClose.addEventListener('keydown', onEscPress);
    buttonClose.addEventListener('click', onPopupClose);
  };

  var onEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      onPinOpen();
    }
  };
  var onPopupClose = function () {
    var currentPin = window.util.MAP.querySelector('.map__pin--active');
    if (currentPin) {
      currentPin.classList.remove('map__pin--active');
    }
    var buttonClose = window.util.MAP.querySelector('.popup__close');
    if (buttonClose.className === 'popup__close') {
      removeElement();
    }
  };
  var onEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      onPopupClose();
    }
  };

  var removeAllPins = function () {
    window.util.MAP.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (elem) {
      elem.remove();
    });
  };

  var addPinEventListeners = function () {
    var pins = window.util.MAP.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      if (pins[i].className === 'map__pin') {
        pins[i].addEventListener('click', onPinOpen);
        pins[i].addEventListener('keydown', onEnterPress);
      }
    }
  };

  var initData = function (data) {
    filteredPinsList = data;
    pinsArray = window.filter(data.slice());
    window.pin(pinsArray);
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
