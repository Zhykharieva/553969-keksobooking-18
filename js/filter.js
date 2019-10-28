'use strict';

(function () {
  var mapFiltersContainer = window.util.MAP.querySelector('.map__filters-container');
  var housingType = mapFiltersContainer.querySelector('#housing-type');
  var housingPrice = mapFiltersContainer.querySelector('#housing-price');
  var housingRooms = mapFiltersContainer.querySelector('#housing-rooms');
  var housingGuests = mapFiltersContainer.querySelector('#housing-guests');
  var housingFeatures = mapFiltersContainer.querySelector('#housing-features');
  var NUMBER_PINS_ON_MAP = 5;
  var DEBOUNCE_INTERVAL = 500;
  window.pinsArray = [];

  var PRICE_RANGE = {
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
  var filterByPrice = function (data) {
    var price = PRICE_RANGE[housingPrice.value];
    return data.offer.price >= price.min && data.offer.price <= price.max;
  };
  var filterByType = function (data) {
    return data.offer.type === housingType.value;
  };
  var filterByRooms = function (data) {
    return data.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var filterByGuests = function (data) {
    return data.offer.rooms === parseInt(housingGuests.value, 10);
  };

  var checkFilter = function (data) {
    var selectedElement = true;
    filtersList.forEach(function (it) {
      if (it.checked) {
        selectedElement = selectedElement && data.offer.features.includes(it.value);
      }
    });
    return selectedElement;
  };


  window.filterSome = function (data) {
    var sortTypeHousings = data.slice();
    if (sortTypeHousings.offer !== null) {

      if (housingType.value !== 'any') {
        sortTypeHousings = sortTypeHousings.filter(filterByType);
      }
      if (housingPrice.value !== 'any') {
        sortTypeHousings = sortTypeHousings.filter(filterByPrice);
      }
      if (housingRooms.value !== 'any') {
        sortTypeHousings = sortTypeHousings.filter(filterByRooms);
      }
      if (housingGuests.value !== 'any') {
        sortTypeHousings = sortTypeHousings.filter(filterByGuests);
      }
      if (filtersList.length > 0) {
        sortTypeHousings = sortTypeHousings.filter(checkFilter);
      }
    }
    return sortTypeHousings.slice(0, NUMBER_PINS_ON_MAP);
  };


  var onFilterChange = window.util.debounce(function () {
    window.map.clean();
    window.map.load();
  }, DEBOUNCE_INTERVAL);


  housingType.addEventListener('change', onFilterChange);
  housingPrice.addEventListener('change', onFilterChange);
  housingRooms.addEventListener('change', onFilterChange);
  housingGuests.addEventListener('change', onFilterChange);
  housingFeatures.addEventListener('change', onFilterChange);

})();
