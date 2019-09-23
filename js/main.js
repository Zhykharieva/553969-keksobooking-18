'use strict';
var TYPE_OF_ACCOMONDATION = ['palace', 'flat', 'house', 'bungalo'];
var TIME_OF_CHECKIN = ['12:00', '13:00', '14:00'];
var TIME_OF_CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TITLES = ['title1', 'title2', 'title3', 'title4', 'title5', 'title6', 'title7', 'title8'];
var PRICE = [100, 2000, 300, 900, 568];
var DESCRIPTION = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
var GUESTS = [1, 2, 3, 4, 5];
var ROOMS = [1, 2, 3, 4, 5];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAP = document.querySelector('.map');
var TOTAL_OBJECTS = 8;
var START_COORD = 130;
var FINISH_COORD = 630;
MAP.classList.remove('map--faded');

var createRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomLengthArr = function (arr) {
  return arr.slice(createRandomNumber(0, arr.length));
};

var spliceRandomElem = function (arr) {
  return arr.splice(createRandomNumber(0, arr.length - 1), 1);
};

var getAvatars = function () {
  var number = 8;
  var avatars = [];

  for (var i = 1; i <= number; i++) {
    var img = 'img/' + 'avatars/' + 'user' + '0' + i + '.png';
    avatars.push(img);
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
    title: TITLES[createRandomNumber(0, TITLES.length - 1)],
    address: currentLocation.x + ',' + currentLocation.y,
    price: PRICE[createRandomNumber(0, PRICE.length - 1)],
    type: TYPE_OF_ACCOMONDATION[createRandomNumber(0, TYPE_OF_ACCOMONDATION.length - 1)],
    rooms: ROOMS[createRandomNumber(0, ROOMS.length - 1)],
    guests: GUESTS[createRandomNumber(0, GUESTS.length - 1)],
    checkin: TIME_OF_CHECKIN[createRandomNumber(0, TIME_OF_CHECKIN.length - 1)],
    checkout: TIME_OF_CHECKOUT[createRandomNumber(0, TIME_OF_CHECKOUT.length - 1)],
    features: getRandomLengthArr(FEATURES),
    description: DESCRIPTION[createRandomNumber(0, DESCRIPTION.length - 1)],
    photos: getRandomLengthArr(PHOTOS),

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

  var templatePin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var resultElement = templatePin.cloneNode(true);

  resultElement.style.left = (ads.location.x + templatePin.offsetWidth / 2) + 'px';
  resultElement.style.top = (ads.location.y - templatePin.offsetHeight) + 'px';
  resultElement.querySelector('img').alt = ads.offer.title;
  resultElement.querySelector('img').src = ads.author;

  return resultElement;
};

var createPinList = function () {
  var templatePins = MAP.querySelector('.map__pins');
  var result = createPinsArray();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < result.length; i++) {
    fragment.appendChild(getPin(result[i]));
  }
  templatePins.appendChild(fragment);
};
createPinList();

