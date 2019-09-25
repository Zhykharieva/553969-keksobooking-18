'use strict';
var TYPE_OF_ACCOMONDATION = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var START_COORD = 130;
var FINISH_COORD = 630;

var getRandomBetween = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateRandomNumberArray = function (limit, max) {
  var arr = [];
  for (var i = 0; i < limit; i++) {
    arr.push(getRandomBetween(1, max));
  }
  return arr;
};

var createNumberedList = function (count, prefix, suffix) {
  var arr = [];
  for (var i = 1; i <= count; i++) {
    arr.push(prefix + i + suffix);
  }
  return arr;
};

var TITLES = createNumberedList(5, 'title', '');
var DESCRIPTION = createNumberedList(8, 'description', '');
var PHOTOS = createNumberedList(8, 'http://o0.github.io/assets/images/tokyo/hotel', '.jpg');
var AVATARS = createNumberedList(8, 'img/avatars/user0', '.png');

var getRandomElement = function (arr) {
  return arr[getRandomBetween(0, arr.length - 1)];
};

var GUESTS = generateRandomNumberArray(10, 8);
var ROOMS = generateRandomNumberArray(4, 5);
var PRICE = generateRandomNumberArray(10, 9890);

var getRandomSlice = function (arr) {
  return arr.slice(getRandomElement(arr));
};

var spliceRandomElem = function (arr) {
  return arr.splice(getRandomElement(arr), 1);
};

var getLocation = function () {
  return {
    x: getRandomBetween(0, MAP.offsetWidth),
    y: getRandomBetween(START_COORD, FINISH_COORD),
  };
};

var getOffer = function (currentLocation) {

  return {
    title: getRandomElement(TITLES),
    address: currentLocation.x + ',' + currentLocation.y,
    price: getRandomElement(PRICE),
    type: getRandomElement(TYPE_OF_ACCOMONDATION),
    rooms: getRandomElement(ROOMS),
    guests: getRandomElement(GUESTS),
    checkin: getRandomElement(TIMES),
    checkout: getRandomElement(TIMES),
    features: getRandomSlice(FEATURES),
    description: getRandomElement(DESCRIPTION),
    photos: getRandomSlice(PHOTOS),

  };
};

var createPinsData = function (number) {
  var pins = [];
  var currentAvatars = AVATARS.slice();

  for (var i = 0; i < number; i++) {
    var currentLocation = getLocation();
    pins.push(
        {
          author: spliceRandomElem(currentAvatars),
          offer: getOffer(currentLocation),
          location: currentLocation,

        });
  }

  return pins;
};
var MAP = document.querySelector('.map');
MAP.classList.remove('map--faded');
var TEMPLATE_PIN = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var TEMPLATE_PINS = MAP.querySelector('.map__pins');
var HALF_PIN_WIDTH = TEMPLATE_PIN.offsetWidth / 2;
var PINS_HEIGHT = TEMPLATE_PIN.offsetHeight;

var getPinElement = function (ads) {

  var resultElement = TEMPLATE_PIN.cloneNode(true);
  var pinPictureElem = resultElement.querySelector('img');

  resultElement.style = 'left:' + (ads.location.x + HALF_PIN_WIDTH) + 'px ;' + ' top:' + (ads.location.y - PINS_HEIGHT) + 'px';

  pinPictureElem.alt = ads.offer.title;
  pinPictureElem.src = ads.author;

  return resultElement;
};

var renderPins = function () {

  var result = createPinsData(8);
  var fragment = document.createDocumentFragment();
  result.forEach(function (item) {
    fragment.appendChild(getPinElement(item));
  });

  TEMPLATE_PINS.appendChild(fragment);
};

renderPins();
