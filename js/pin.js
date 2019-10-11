'use strict';

(function () {
  var TEMPLATE_PIN = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var TEMPLATE_PINS = window.MAP.querySelector('.map__pins');
  var HALF_PIN_WIDTH = TEMPLATE_PIN.offsetWidth / 2;
  var PINS_HEIGHT = TEMPLATE_PIN.offsetHeight;

  var getPinElement = function (id, ads) {
    var resultElement = TEMPLATE_PIN.cloneNode(true);
    var pinPictureElem = resultElement.querySelector('img');
    resultElement.style = 'left:' + (ads.location.x + HALF_PIN_WIDTH) + 'px ;' + ' top:' + (ads.location.y - PINS_HEIGHT) + 'px';
    resultElement.setAttribute('accommondationId', id);
    pinPictureElem.alt = ads.offer.title;
    pinPictureElem.src = ads.author;

    return resultElement;
  };

  window.renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < arr.length; j++) {
      // arr.forEach(function (item) {
      fragment.appendChild(getPinElement(j, arr[j]));
    }
    TEMPLATE_PINS.appendChild(fragment);
  };

})();
