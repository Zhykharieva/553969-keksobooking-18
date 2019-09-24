'use strict';
var TYPE_OF_ACCOMONDATION = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var START_COORD = 130;
var FINISH_COORD = 630;

var createRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateRandomNumberArray = function (limit, max) {
  var arr = [];
  for (var i = 0; i < limit; i++) {
    arr.push(createRandomNumber(1, max));
  }
  return arr;
};

var createString = function (number, content1, content2) {
  var arr = [];
  for (var i = 1; i <= number; i++) {
    arr.push(content1 + i + content2);
  }
  return arr;
};

var TITLES = createString(5, 'title', '');
var DESCRIPTION = createString(8, 'description', '');
var PHOTOS = createString(8, 'http://o0.github.io/assets/images/tokyo/hotel', '.jpg');
var AVATARS = createString(8, 'img/avatars/user0', '.png');

var getRandomElement = function (arr) {
  return arr[createRandomNumber(0, arr.length - 1)];
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
    x: createRandomNumber(0, MAP.offsetWidth),
    y: createRandomNumber(START_COORD, FINISH_COORD),
  };
};

var getOffer = function () {
  var currentLocation = getLocation();
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

var createPinsDatas = function (number) {
  var pins = [];
  var currentAvatars = AVATARS.slice();

  for (var i = 0; i < number; i++) {
    pins.push(
        {
          author: spliceRandomElem(currentAvatars),
          offer: getOffer(),
          location: getLocation(),

        });
  }

  return pins;
};

var getPin = function (ads) {

  var resultElement = TEMPLATE_PIN.cloneNode(true);
  var pinPictureElem = resultElement.querySelector('img');

  resultElement.style = 'left:' + (ads.location.x + TEMPLATE_PIN.offsetWidth / 2) + 'px ;' + ' top:' + (ads.location.y - TEMPLATE_PIN.offsetHeight) + 'px';

  pinPictureElem.alt = ads.offer.title;
  pinPictureElem.src = ads.author;

  return resultElement;
};

var createPinList = function () {

  var result = createPinsDatas(8);
  var fragment = document.createDocumentFragment();
  result.forEach(function (item) {
    fragment.appendChild(getPin(item));
  });

  TEMPLATE_PINS.appendChild(fragment);
};
var MAP = document.querySelector('.map');
MAP.classList.remove('map--faded');
var TEMPLATE_PINS = MAP.querySelector('.map__pins');
var TEMPLATE_PIN = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
createPinList();

