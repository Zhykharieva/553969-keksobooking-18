'use strict';

(function () {
  var mapFiltersContainer = window.util.MAP.querySelector('.map__filters-container');
  var housingType = mapFiltersContainer.querySelector('#housing-type');
  var housingPrice = mapFiltersContainer.querySelector('#housing-price');
  var housingRooms = mapFiltersContainer.querySelector('#housing-rooms');
  var housingGuests = mapFiltersContainer.querySelector('#housing-guests');
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
    mapFiltersContainer.querySelector('#filter-wifi'),
    mapFiltersContainer.querySelector('#filter-dishwasher'),
    mapFiltersContainer.querySelector('#filter-parking'),
    mapFiltersContainer.querySelector('#filter-washer'),
    mapFiltersContainer.querySelector('#filter-elevator'),
    mapFiltersContainer.querySelector('#filter-conditioner')
  ];

  var checkOffer = function (item) {
    return item.hasOwnProperty('offer');
  };

  var checkAny = function (element) {
    return element === 'any';
  };

  var filterByPrice = function (data) {
    var price = PRICE_RANGE[housingPrice.value];
    return data.offer.price >= price.min && data.offer.price <= price.max || checkAny(housingPrice.value);
  };

  var filterByType = function (data) {
    return (data.offer.type === housingType.value) || checkAny(housingType.value);
  };

  var filterByRooms = function (data) {
    return (data.offer.rooms === parseInt(housingRooms.value, 10)) || checkAny(housingRooms.value);
  };

  var filterByGuests = function (data) {
    return (data.offer.rooms === parseInt(housingGuests.value, 10)) || checkAny(housingGuests.value);
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
    var filteredAccomandation = data.slice();
    filteredAccomandation = filteredAccomandation.filter(function (item) {
      return checkOffer(item) &&
      filterByType(item) &&
      filterByPrice(item) &&
      filterByRooms(item) &&
      filterByGuests(item) &&
      filterByFeateres(item);
    });
    return filteredAccomandation.slice(0, NUMBER_PINS_ON_MAP);
  };

  mapFiltersContainer.addEventListener('change', onFilterChange);

})();
