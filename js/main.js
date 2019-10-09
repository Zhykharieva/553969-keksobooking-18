'use strict';
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MIN_Y = 130;
var MAX_Y = 630;
var TOTAL_PINS_NUMBER = 8;
var TYPE_OF_HOUSING_LIST_MAP = {
  'bungalo': 'Бунгало',
  'flat': 'Квартира',
  'house': 'Дом',
  'palace': 'Дворец',
};
var MIN_PRICE_OF_ACCOMMONDATION_MAP = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};
var TYPE_OF_HOUSING = Object.keys(TYPE_OF_HOUSING_LIST_MAP);

var CAPACITY_OF_ROOMS = {
  '1': 'для 1 гостя',
  '2': 'для 2 гостей или для 1 гостя',
  '3': 'для 3 гостей, для 2 гостей или для 1 гостя',
  '100': 'не для гостей',
};

var MAP = document.querySelector('.map');
var inactiveMode = true;
var TEMPLATE_PIN = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var TEMPLATE_PINS = MAP.querySelector('.map__pins');
var HALF_PIN_WIDTH = TEMPLATE_PIN.offsetWidth / 2;
var PINS_HEIGHT = TEMPLATE_PIN.offsetHeight;
var SIMILAR_LIST_ELEMENT = MAP.querySelector('.map__filters-container');
var SIMILAR_ELEM_TEMPLATE = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var PICTURE_TEMPLATE = SIMILAR_ELEM_TEMPLATE.querySelector('.popup__photo');

var ENTER_KEYCODE = 13;
var ADS_FORM = document.querySelector('.ad-form');
var ADDRESS = ADS_FORM.querySelector('#address');
var PRICE_OF_HOUSING = ADS_FORM.querySelector('#price');
var TYPE_OF_HOUSING_OPTION = ADS_FORM.querySelector('#type');
var MAP_FILTERS = document.querySelector('.map__filters');
var FORMS_FIELDS = ADS_FORM.querySelectorAll('fieldset');
var MAP_FILTERS_FIELDS = MAP_FILTERS.querySelectorAll('select');
var TIME_IN = ADS_FORM.querySelector('#timein');
var TIME_OUT = ADS_FORM.querySelector('#timeout');
var ROOMS_OPTION = ADS_FORM.querySelector('#room_number');
var ROOMS_CAPACITY = ADS_FORM.querySelector('#capacity');
var SUBMIT = ADS_FORM.querySelector('.ad-form__submit');
var MAIN_PIN = MAP.querySelector('.map__pin--main');
var MAIN_PIN_HALF_WIDTH = MAIN_PIN.offsetWidth / 2;
var MAIN_PIN_HEIGHT = MAIN_PIN.offsetHeight;
var MAIN_PIN_HALF_HEIGHT = Math.floor(MAIN_PIN_HEIGHT / 2);
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

var createNewFeaturesLi = function (arr1, prefix, suffix) {
  var arr2 = [];
  arr1.map(function (item) {
    arr2.push(prefix + item + suffix);
  });
  return arr2;
};

var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    inactiveMode = false;
    onMainPinPress();
  }
};

var TITLES = createNumberedList(5, 'title', '');
var DESCRIPTION = createNumberedList(8, 'description', '');
var PHOTOS = createNumberedList(3, 'http://o0.github.io/assets/images/tokyo/hotel', '.jpg');
var AVATARS = createNumberedList(8, 'img/avatars/user0', '.png');

var getRandomElement = function (arr) {
  return arr[getRandomBetween(0, arr.length - 1)];
};

var GUESTS = generateRandomNumberArray(10, 8);
var ROOMS = generateRandomNumberArray(4, 5);
var PRICE = generateRandomNumberArray(10, 9890);

var getRandomSlice = function (arr) {
  return arr.slice(getRandomBetween(0, arr.length - 1));
};

var spliceRandomElem = function (arr) {
  return arr.splice(getRandomElement(arr), 1);
};

var getLocation = function () {
  return {
    x: getRandomBetween(0, MAP.offsetWidth),
    y: getRandomBetween(MIN_Y, MAX_Y),
  };
};

var getOffer = function (location) {

  return {
    title: getRandomElement(TITLES),
    address: [location.x, location.y].join(','),
    price: getRandomElement(PRICE),
    type: getRandomElement(TYPE_OF_HOUSING),
    rooms: getRandomElement(ROOMS),
    guests: getRandomElement(GUESTS),
    checkin: getRandomElement(TIMES),
    checkout: getRandomElement(TIMES),
    features: getRandomSlice(FEATURES),
    description: getRandomElement(DESCRIPTION),
    photos: getRandomSlice(PHOTOS),

  };
};

var createPinsData = function (count) {
  var pins = [];
  var avatars = AVATARS.slice();

  for (var i = 0; i < count; i++) {
    var location = getLocation();
    pins.push(
        {
          author: spliceRandomElem(avatars),
          offer: getOffer(location),
          location: location,

        });
  }

  return pins;
};

var getPinElement = function (ads) {
  var resultElement = TEMPLATE_PIN.cloneNode(true);
  var pinPictureElem = resultElement.querySelector('img');
  resultElement.style = 'left:' + (ads.location.x + HALF_PIN_WIDTH) + 'px ;' + ' top:' + (ads.location.y - PINS_HEIGHT) + 'px';
  pinPictureElem.alt = ads.offer.title;
  pinPictureElem.src = ads.author;

  return resultElement;
};

var renderPins = function (arr) {
  var fragment = document.createDocumentFragment();
  arr.forEach(function (item) {
    fragment.appendChild(getPinElement(item));
  });

  TEMPLATE_PINS.appendChild(fragment);
};

var getPictureTemplate = function (elem) {

  var picture = PICTURE_TEMPLATE.cloneNode(true);
  picture.className = 'popup__photo';
  picture.src = elem;
  picture.width = 45;
  picture.height = 40;
  picture.alt = 'Фотография жилья';
  return picture;
};

var renderPhotos = function (card) {
  var fragment = document.createDocumentFragment();
  card.forEach(function (item) {
    fragment.appendChild(getPictureTemplate(item));
  });
  return fragment;
};

var renderFeatures = function (features) {
  var result = createNewFeaturesLi(features, '<li class="popup__feature popup__feature--', '" ></li>');
  return result.join('');
};

var renderCard = function (cardData) {

  var cardElement = SIMILAR_ELEM_TEMPLATE.cloneNode(true);
  var currenFeatures = cardData.offer.features;
  var currentPhotos = cardData.offer.photos;
  var currentCardPhotoElement = cardElement.querySelector('.popup__photos');
  cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPE_OF_HOUSING_LIST_MAP[cardData.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time ').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout + '.';
  cardElement.querySelector('.popup__features').innerHTML = renderFeatures(currenFeatures);
  cardElement.querySelector('.popup__description').textContent = cardData.offer.description;
  currentCardPhotoElement.innerHTML = '';
  currentCardPhotoElement.appendChild(renderPhotos(currentPhotos));

  return cardElement;
};

var createCard = function () {
  MAP.classList.remove('map--faded');
  var pinsArray = createPinsData(TOTAL_PINS_NUMBER);
  renderPins(pinsArray);
  MAP.insertBefore(renderCard(pinsArray[0]), SIMILAR_LIST_ELEMENT);

};

var setFieldDisabled = function (data) {
  data.forEach(function (elem) {
    elem.setAttribute('disabled', 'disabled');
  });
};

var getCoordInactivePin = function () {
  return {
    x: Math.floor(parseInt((MAIN_PIN.style.left), 10) - MAIN_PIN_HALF_WIDTH),
    y: Math.floor(parseInt((MAIN_PIN.style.top), 10) + MAIN_PIN_HALF_HEIGHT),
  };

};

var setFieldAddress = function () {
  var getResultCoords = getCoordInactivePin();
  if (inactiveMode) {
    ADDRESS.value = getResultCoords.x + ', ' + getResultCoords.y;
  } else {
    ADDRESS.value = getResultCoords.x + ', ' + (getResultCoords.y + MAIN_PIN_HALF_HEIGHT);
  }
  ADDRESS.setAttribute('value', ADDRESS.value);

};


var removeFieldDisabled = function (data) {
  data.forEach(function (elem) {
    elem.removeAttribute('disabled');
  });
};

var setInactiveMode = function () {
  inactiveMode = true;
  setFieldDisabled(FORMS_FIELDS);
  setFieldDisabled(MAP_FILTERS_FIELDS);
  setFieldAddress();
};


var onMainPinPress = function () {
  inactiveMode = false;
  setFieldAddress();
  MAP.classList.remove('map--faded');
  removeFieldDisabled(FORMS_FIELDS);
  removeFieldDisabled(MAP_FILTERS_FIELDS);
  ADS_FORM.classList.remove('ad-form--disabled');

};

var syncТimeInAndOut = function (timein, timeout) {
  timein.addEventListener('change', function (evt) {
    timeout.value = evt.target.value;
  });
  timeout.addEventListener('change', function (evt) {
    timein.value = evt.target.value;
  });
};

var onHousingOptionChange = function () {
  var type = TYPE_OF_HOUSING_OPTION.value;
  var currentType = MIN_PRICE_OF_ACCOMMONDATION_MAP[type];
  PRICE_OF_HOUSING.setAttribute('min', currentType);
  PRICE_OF_HOUSING.setAttribute('placeholder', currentType);

};

var onCountGuestsChange = function () {
  var selectedCapacity = ROOMS_CAPACITY.options[ROOMS_CAPACITY.selectedIndex];
  var selectedRoom = ROOMS_OPTION.options[ROOMS_OPTION.selectedIndex].value;
  var currentCapacityValue = parseInt((selectedCapacity.value), 10);
  var message = CAPACITY_OF_ROOMS[selectedRoom];
  if (selectedRoom === '100') {
    return currentCapacityValue !== 0 ? ROOMS_CAPACITY.setCustomValidity(message) : ROOMS_CAPACITY.setCustomValidity('');
  } else {
    return selectedRoom < currentCapacityValue || currentCapacityValue === 0 ? ROOMS_CAPACITY.setCustomValidity(message) : ROOMS_CAPACITY.setCustomValidity('');
  }
};

MAIN_PIN.addEventListener('mousedown', onMainPinPress);
MAIN_PIN.addEventListener('keydown', onPopupEnterPress);
TYPE_OF_HOUSING_OPTION.addEventListener('click', onHousingOptionChange);
SUBMIT.addEventListener('click', onCountGuestsChange);

// createCard();
setInactiveMode();
syncТimeInAndOut(TIME_IN, TIME_OUT);
