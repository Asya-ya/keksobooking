const DEFAULT_VALUE = 'any';
const FILTER_MIN_PRICE = 10000;
const FILTER_MAX_PRICE = 50000;

const filtersForm = document.querySelector('.map__filters');
const typeSelect = filtersForm.querySelector('#housing-type');
const priceSelect = filtersForm.querySelector('#housing-price');
const roomsSelect = filtersForm.querySelector('#housing-rooms');
const guestsSelect = filtersForm.querySelector('#housing-guests');
const featuresSelect = filtersForm.querySelectorAll('.map__checkbox');

const filterByType = (advert) => {
  return (typeSelect.value === advert.offer.type || typeSelect.value === DEFAULT_VALUE);
};

const filterByPrice = (advert) => {
  const checkPrice = () => {
    if (advert.offer.price <= FILTER_MIN_PRICE) {
      return 'low';
    } else if (advert.offer.price > FILTER_MIN_PRICE && advert.offer.price <= FILTER_MAX_PRICE) {
      return 'middle';
    } else {
      return 'high';
    }
  }

  return (priceSelect.value === checkPrice() || priceSelect.value === DEFAULT_VALUE);
};

const filterByRooms = (advert) => {
  return (roomsSelect.value === String(advert.offer.rooms) || roomsSelect.value === DEFAULT_VALUE);
};

const filterByGuests = (advert) => {
  return (guestsSelect.value === String(advert.offer.guests) || guestsSelect.value === DEFAULT_VALUE);
};

const filterByFeatures = (advert) => {
  if (!advert.offer.features) {
    advert.offer.features = [];
  }

  for (let feature of featuresSelect) {
    if (feature.checked && !advert.offer.features.includes(feature.value)) {
      return false;
    }
  }
  return true;
}

const setFilterChange = (cb) => {
  typeSelect.addEventListener('change', () => cb());
  priceSelect.addEventListener('change', () => cb());
  roomsSelect.addEventListener('change', () => cb());
  guestsSelect.addEventListener('change', () => cb());
  for (let feature of featuresSelect) {
    feature.addEventListener('change', () => cb());
  }
};

const filterAll = (advert) => {
  return filterByType(advert) && filterByPrice(advert) && filterByRooms(advert) && filterByGuests(advert) && filterByFeatures(advert);
};

export { filterAll, setFilterChange }
