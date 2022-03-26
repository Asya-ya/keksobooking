import { disableForm, enableForm, adForm, adFormElements } from './form.js';
import { createAdvert } from './data.js';
import { createPopup } from './add-advert.js';

const mapForm = document.querySelector('.map__filters');
const mapFormFilters = mapForm.querySelectorAll('.map__filter');
const mapFormFeature = mapForm.querySelector('.map__features');
const mapFormElements = Array.from(mapFormFilters);
mapFormElements.push(mapFormFeature);
const mapCanvas = document.querySelector('#map-canvas');
const addressInput = adForm.querySelector('#address');

// Неактивное состояние карты
disableForm(mapForm, mapFormElements, mapForm.classList[0]);

// Создание карты
const map = L.map(mapCanvas)
  .on('load', () => {
    enableForm(mapForm, mapFormElements, mapForm.classList[0]);
    enableForm(adForm, adFormElements, adForm.classList[0]);
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });

mainPinMarker.addTo(map);

addressInput.value = '35.68950, 139.69171';

mainPinMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat.toFixed(5);
  const lng = evt.target.getLatLng().lng.toFixed(5);

  addressInput.value = `${lat}, ${lng}`;
})

const adverts = createAdvert();

adverts.forEach(advert => {
  const pinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const pinMarker = L.marker(
    {
      lat: advert.location.x,
      lng: advert.location.y,
    },
    {
      icon: pinIcon,
    },
  )

  pinMarker.addTo(map).bindPopup(createPopup(advert));
})
