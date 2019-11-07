'use strict';

(function () {
  var TEMPLATE_PIN_ELEMENT = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var TEMPLATE_PINS_ELEMENT = window.util.MAP.querySelector('.map__pins');
  var HALF_PIN_WIDTH = TEMPLATE_PIN_ELEMENT.offsetWidth / 2;
  var PINS_HEIGHT = TEMPLATE_PIN_ELEMENT.offsetHeight;

  var getPinElement = function (id, ads) {
    var resultElement = TEMPLATE_PIN_ELEMENT.cloneNode(true);
    var pinPictureElem = resultElement.querySelector('img');
    resultElement.style = 'left:' + (ads.location.x + HALF_PIN_WIDTH) + 'px ;' + ' top:' + (ads.location.y - PINS_HEIGHT) + 'px';
    resultElement.setAttribute('accommondationId', id);
    pinPictureElem.alt = ads.offer.title;
    pinPictureElem.src = ads.author.avatar;

    return resultElement;
  };

  window.pin = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item, j) {
      fragment.appendChild(getPinElement(j, item));
    });
    TEMPLATE_PINS_ELEMENT.appendChild(fragment);
  };

})();
