import { createAdvert } from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const similarAdverts = createAdvert();

const createFeatures = (items, container) => {
  if (items) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const newElement = document.createElement('li');
      newElement.classList.add('popup__feature');
      newElement.classList.add('popup__feature--' + item);

      fragment.appendChild(newElement);
    });

    container.appendChild(fragment);
  } else {
    container.classList.add('visually-hidden');
  }
};

const createPhotos = (items, container) => {
  if (items) {
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const newElement = container.querySelector('.popup__photo').cloneNode(true);
      newElement.src = item;

      fragment.appendChild(newElement);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  } else {
    container.classList.add('visually-hidden');
  }
};

const adverts = [];

similarAdverts.forEach(({author, offer}) => {
  const newCard = cardTemplate.cloneNode(true);

  let typeAdvert = '';
  switch (offer.type) {
    case 'flat':
      typeAdvert = 'Квартира';
      break
    case 'bungalow':
      typeAdvert = 'Бунгало';
      break;
    case 'house':
      typeAdvert = 'Дом';
      break;
    case 'palace':
      typeAdvert = 'Дворец';
      break;
  }

  newCard.querySelector('.popup__title').textContent = offer.title;
  newCard.querySelector('.popup__text--address').textContent = offer.address;
  newCard.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  newCard.querySelector('.popup__type').textContent = typeAdvert;
  newCard.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  createFeatures(offer.features, newCard.querySelector('.popup__features'));
  newCard.querySelector('.popup__description').textContent = offer.description;
  createPhotos(offer.photos, newCard.querySelector('.popup__photos'));
  newCard.querySelector('.popup__avatar').src = author.avatar;

  adverts.push(newCard);
})

mapCanvas.appendChild(adverts[0]);
