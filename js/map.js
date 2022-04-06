import { disableForm, enableForm, enableAdForm, adForm } from './form.js';
import { createPopup } from './card.js';

const CENTER_LAT = 35.68950;
const CENTER_LNG = 139.69171;
const MAIN_ICON_SIZE = 52;
const ICON_SIZE = 40;

const mapForm = document.querySelector('.map__filters');
const mapFormFilters = mapForm.querySelectorAll('.map__filter');
const mapFormFeature = mapForm.querySelector('.map__features');
const mapFormElements = Array.from(mapFormFilters);
mapFormElements.push(mapFormFeature);
const mapCanvas = document.querySelector('#map-canvas');
const addressInput = adForm.querySelector('#address');

// Неактивное состояние карты
const disableMapForm = () => disableForm(mapForm, mapFormElements, mapForm.classList[0]);

// Создание карты
const map = L.map(mapCanvas);

const getMap = () => {
  map.on('load', () => {
    enableForm(mapForm, mapFormElements, mapForm.classList[0]);
    enableAdForm();
  })
    .setView({
      lat: CENTER_LAT,
      lng: CENTER_LNG,
    }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_ICON_SIZE, MAIN_ICON_SIZE],
  iconAnchor: [MAIN_ICON_SIZE / 2, MAIN_ICON_SIZE],
});

const mainPinMarker = L.marker(
  {
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });

mainPinMarker.addTo(map);

// Запись координат центра в поле адреса
addressInput.value = `${CENTER_LAT}, ${CENTER_LNG}`;

// Запись координат маркера в поле адреса
mainPinMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat.toFixed(5);
  const lng = evt.target.getLatLng().lng.toFixed(5);

  addressInput.value = `${lat}, ${lng}`;
})

// Создание балуна для каждого объявления
const createPinMarker = (adverts) => {
  adverts.forEach(advert => {
    const pinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [ICON_SIZE, ICON_SIZE],
      iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
    });

    const pinMarker = L.marker(
      {
        lat: advert.location.lat,
        lng: advert.location.lng,
      },
      {
        icon: pinIcon,
      },
    )

    pinMarker.addTo(map).bindPopup(createPopup(advert));
  })
};

export { getMap, createPinMarker, disableMapForm }
