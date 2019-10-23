'use strict';

(function () {
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


  window.TYPE_OF_HOUSING_LIST_MAP = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var TYPE_OF_HOUSING = Object.keys(window.TYPE_OF_HOUSING_LIST_MAP);
  var TITLES = window.createNumberedList(5, 'title', '');
  var DESCRIPTION = window.createNumberedList(8, 'description', '');
  var PHOTOS = window.createNumberedList(3, 'http://o0.github.io/assets/images/tokyo/hotel', '.jpg');
  var AVATARS = window.createNumberedList(8, 'img/avatars/user0', '.png');
  var GUESTS = window.generateRandomNumberArray(10, 8);
  var ROOMS = window.generateRandomNumberArray(4, 5);
  var PRICE = window.generateRandomNumberArray(10, 9890);
  window.MAP = document.querySelector('.map');


  var getLocation = function () {
    return {
      x: window.getRandomBetween(0, window.MAP.offsetWidth),
      y: window.getRandomBetween(MIN_Y, MAX_Y),
    };
  };

  var getOffer = function (location) {

    return {
      title: window.getRandomElement(TITLES),
      address: [location.x, location.y].join(','),
      price: window.getRandomElement(PRICE),
      type: window.getRandomElement(TYPE_OF_HOUSING),
      rooms: window.getRandomElement(ROOMS),
      guests: window.getRandomElement(GUESTS),
      checkin: window.getRandomElement(TIMES),
      checkout: window.getRandomElement(TIMES),
      features: window.getRandomSlice(FEATURES),
      description: window.getRandomElement(DESCRIPTION),
      photos: window.getRandomSlice(PHOTOS),

    };
  };
  window.createPinsData = function (count) {
    var pins = [];
    var avatars = AVATARS.slice();

    for (var i = 0; i < count; i++) {
      var location = getLocation();
      pins.push(
          {
            author: window.spliceRandomElem(avatars),
            offer: getOffer(location),
            location: location,

          });
    }

    return pins;
  };

})();
