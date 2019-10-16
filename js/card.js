'use strict';

(function () {
  var SIMILAR_ELEM_TEMPLATE = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var PICTURE_TEMPLATE = SIMILAR_ELEM_TEMPLATE.querySelector('.popup__photo');

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
  var createNewFeaturesLi = function (arr1, prefix, suffix) {
    var arr2 = [];
    arr1.map(function (item) {
      arr2.push(prefix + item + suffix);
    });
    return arr2;
  };

  var renderFeatures = function (features) {
    var result = createNewFeaturesLi(features, '<li class="popup__feature popup__feature--', '" ></li>');
    return result.join('');
  };

  window.card = function (cardData) {

    var cardElement = SIMILAR_ELEM_TEMPLATE.cloneNode(true);
    var currenFeatures = cardData.offer.features;
    var currentPhotos = cardData.offer.photos;
    var currentCardPhotoElement = cardElement.querySelector('.popup__photos');
    cardElement.querySelector('.popup__avatar').src = cardData.author.avatar + ''; //TODO find more sophisticated way convert to String
    cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = cardData.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time ').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout + '.';
    cardElement.querySelector('.popup__features').innerHTML = renderFeatures(currenFeatures);
    cardElement.querySelector('.popup__description').textContent = cardData.offer.description;
    currentCardPhotoElement.innerHTML = '';
    currentCardPhotoElement.appendChild(renderPhotos(currentPhotos));

    return cardElement;
  };
})();
