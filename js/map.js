'use strict';

(function () {
  var TOTAL_PINS_NUMBER = 8;
  var SIMILAR_LIST_ELEMENT = window.MAP.querySelector('.map__filters-container');
  var pinsArray = window.createPinsData(TOTAL_PINS_NUMBER);
  var removeElement = function () {
    var card = window.MAP.querySelector('.map__card');
    if (card) {
      card.remove(card);
    }
  };
  var onPopupClose = function () {
    var buttonClose = window.MAP.querySelector('.popup__close');
    if (buttonClose.className === 'popup__close') {
      removeElement();
    }

  };
  var onEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      onPopupClose();
    }
  };
  var onCardCreate = function (evt) {
    var elemId = evt.currentTarget.attributes.accommondationId.value;
    return window.MAP.insertBefore(window.renderCard(pinsArray[elemId]), SIMILAR_LIST_ELEMENT);
  };

  var onPinOpen = function (evt) {
    removeElement();
    onCardCreate(evt);
    var buttonClose = window.MAP.querySelector('.popup__close');
    buttonClose.addEventListener('keydown', onEscPress);
    buttonClose.addEventListener('click', onPopupClose);
  };

  var onEnterPress = function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      onPinOpen();
    }
  };

  window.createPinsList = function () {
    window.renderPins(pinsArray);
    var PIN = window.MAP.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < PIN.length; i++) {
      if (PIN[i].className === 'map__pin') {
        PIN[i].addEventListener('click', onPinOpen);
        PIN[i].addEventListener('keydown', onEnterPress);
      }
    }

  };

})();
