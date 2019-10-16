'use strict';

(function () {
  var SIMILAR_LIST_ELEMENT = window.util.MAP.querySelector('.map__filters-container');
  var pinsArray = [];

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

  var addPinEventListeners = function () {
    var PIN = window.util.MAP.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < PIN.length; i++) {

      if (PIN[i].className === 'map__pin') {
        PIN[i].addEventListener('click', onPinOpen);
        PIN[i].addEventListener('keydown', onEnterPress);

      }
    }
  };

  var initData = function (data) {
    pinsArray = data;
    window.pin(pinsArray);
    addPinEventListeners();
  };

  window.map = function () {
    window.load(initData, window.error);
  };


})();
