const types = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createFeatures = (items, container) => {
  if (items) {
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const newElement = document.createElement('li');
      newElement.classList.add('popup__feature');
      newElement.classList.add('popup__feature--' + item);

      fragment.appendChild(newElement);
    });

    container.innerHTML = '';
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

const getRoomsEnding = (rooms) => {
  if (rooms === 1) {
    return 'комната';
  } else if (rooms > 1 && rooms < 5) {
    return 'комнаты';
  } else {
    return 'комнат';
  }
};

const getGuestsEnding = (guests) => {
  return (guests === 1) ? 'гостя' : 'гостей';
};

const createPopup = ({author, offer}) => {
  const newCard = cardTemplate.cloneNode(true);

  // Добавление информации в шаблон
  newCard.querySelector('.popup__title').textContent = offer.title;
  newCard.querySelector('.popup__text--address').textContent = offer.address;
  newCard.querySelector('.popup__text--price').textContent = offer.price ? `${offer.price} ₽/ночь` : '';
  newCard.querySelector('.popup__type').textContent = types[offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = (offer.rooms && offer.guests) ?`${offer.rooms} ${getRoomsEnding(offer.rooms)} для ${offer.guests} ${getGuestsEnding(offer.guests)}` : '';
  newCard.querySelector('.popup__text--time').textContent = (offer.checkin && offer.checkout) ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : '';
  createFeatures(offer.features, newCard.querySelector('.popup__features'));
  newCard.querySelector('.popup__description').textContent = offer.description;
  createPhotos(offer.photos, newCard.querySelector('.popup__photos'));
  newCard.querySelector('.popup__avatar').src = author.avatar;

  return newCard;
};

export { createPopup };
