'use strict';

(function () {
  var MAP_FILTER_CONTAINER_ELEMENT = window.util.MAP.querySelector('.map__filters-container');
  var HOUSING_TYPE_ELEMENT = MAP_FILTER_CONTAINER_ELEMENT.querySelector('#housing-type');
  var HOUSING_PRICE_ELEMENT = MAP_FILTER_CONTAINER_ELEMENT.querySelector('#housing-price');
  var HOUSING_ROOMS_ELEMENT = MAP_FILTER_CONTAINER_ELEMENT.querySelector('#housing-rooms');
  var HOUSING_GUESTS_ELEMENT = MAP_FILTER_CONTAINER_ELEMENT.querySelector('#housing-guests');
  var NUMBER_PINS_ON_MAP = 5;
  var DEBOUNCE_INTERVAL = 500;

  var PRICE_RANGE = {
    any: 'any',
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var filtersList = [
    MAP_FILTER_CONTAINER_ELEMENT.querySelector('#filter-wifi'),
    MAP_FILTER_CONTAINER_ELEMENT.querySelector('#filter-dishwasher'),
    MAP_FILTER_CONTAINER_ELEMENT.querySelector('#filter-parking'),
    MAP_FILTER_CONTAINER_ELEMENT.querySelector('#filter-washer'),
    MAP_FILTER_CONTAINER_ELEMENT.querySelector('#filter-elevator'),
    MAP_FILTER_CONTAINER_ELEMENT.querySelector('#filter-conditioner')
  ];

  var checkOffer = function (item) {
    return item.hasOwnProperty('offer');
  };

  var checkAny = function (element) {
    return element === 'any';
  };

  var filterByPrice = function (data) {
    var price = PRICE_RANGE[HOUSING_PRICE_ELEMENT.value];
    return data.offer.price >= price.min && data.offer.price <= price.max || checkAny(HOUSING_PRICE_ELEMENT.value);
  };

  var filterByType = function (data) {
    return (data.offer.type === HOUSING_TYPE_ELEMENT.value) || checkAny(HOUSING_TYPE_ELEMENT.value);
  };

  var filterByRoomsOrGuests = function (data, elem) {
    return (data.offer.rooms === parseInt(elem.value, 10)) || checkAny(elem.value);
  };

  var filterByFeateres = function (data) {
    var selectedElement = true;
    filtersList.forEach(function (it) {
      if (it.checked) {
        selectedElement = selectedElement && data.offer.features.includes(it.value);
      }
    });
    return selectedElement;
  };

  var onFilterChange = window.util.debounce(function () {
    window.map.clean();
    window.map.filterAfterLoad();

  }, DEBOUNCE_INTERVAL);

  window.filter = function (data) {

    return data.filter(function (item) {
      return checkOffer(item) &&
      filterByType(item) &&
      filterByPrice(item) &&
      filterByRoomsOrGuests(item, HOUSING_ROOMS_ELEMENT) &&
      filterByRoomsOrGuests(item, HOUSING_GUESTS_ELEMENT) &&
      filterByFeateres(item);
    })
    .slice(0, NUMBER_PINS_ON_MAP);

  };

  MAP_FILTER_CONTAINER_ELEMENT.addEventListener('change', onFilterChange);

})();
