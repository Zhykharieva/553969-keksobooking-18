'use strict';
var TYPE_OF_ACCOMONDATION = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TITLES = ['title1', 'title2', 'title3', 'title4'];
var DESCRIPTION = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TOTAL_OBJECTS = 8;
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
    arr[i] = createRandomNumber(1, max);
  }
  return arr;
};

var getRandomIndexArray = function (arr) {
  return createRandomNumber(0, arr.length - 1);
};

var GUESTS = generateRandomNumberArray(10, 8);
var ROOMS = generateRandomNumberArray(4, 5);
var PRICE = generateRandomNumberArray(10, 9890);

var getRandomSlice = function (arr) {
  return arr.slice(getRandomIndexArray(arr));
};

var spliceRandomElem = function (arr) {
  return arr.splice(getRandomIndexArray(arr), 1);
};

var getAvatars = function () {
  var avatars = [];
  for (var i = 1; i <= TOTAL_OBJECTS; i++) {
    avatars.push('img/' + 'avatars/' + 'user' + '0' + i + '.png');
  }
  return avatars;
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
    title: TITLES[getRandomIndexArray(TITLES)],
    address: currentLocation.x + ',' + currentLocation.y,
    price: PRICE[getRandomIndexArray(PRICE)],
    type: TYPE_OF_ACCOMONDATION[getRandomIndexArray(TYPE_OF_ACCOMONDATION)],
    rooms: ROOMS[getRandomIndexArray(ROOMS)],
    guests: GUESTS[getRandomIndexArray(GUESTS)],
    checkin: TIMES[getRandomIndexArray(TIMES)],
    checkout: TIMES[getRandomIndexArray(TIMES)],
    features: getRandomSlice(FEATURES),
    description: DESCRIPTION[getRandomIndexArray(DESCRIPTION)],
    photos: getRandomSlice(PHOTOS),

  };
};

var createPinsArray = function () {
  var pins = [];
  var avatars = getAvatars();
  var newAvatars = avatars.slice();

  for (var i = 0; i < TOTAL_OBJECTS; i++) {
    pins.push(
        {
          author: spliceRandomElem(newAvatars),
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

  var result = createPinsArray();
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

