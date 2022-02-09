const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const MAX_PRICE = 50000;

const MAX_ROOMS = 6;

const MAX_GUESTS = 12;

const COUNT_ADVERTS = 10;

const Latitude = {
  MIN: 35.65000,
  MAX: 35.70000,
};

const Longitude = {
  MIN: 139.70000,
  MAX: 139.80000,
};

const getRandomInt = (min, max) => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    return -1;
  } else if (min < 0 || max < 0) {
    return -1;
  } else if (min >= max) {
    return -1;
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

const getRandomNumber = (min, max, decimalPoint) => {
  if (!Number.isFinite(min) || !Number.isFinite(max) || !Number.isInteger(decimalPoint)) {
    return -1;
  } else if (min < 0 || max < 0) {
    return -1;
  } else if (min >= max) {
    return -1;
  } else {
    return +(Math.random() * (max - min) + min).toFixed(decimalPoint);
  }
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

const createAdvert = () => {
  let adverts = [];

  for (let i = 0; i < COUNT_ADVERTS; i++) {
    let x = getRandomNumber(Latitude.MIN, Latitude.MAX, 5);
    let y = getRandomNumber(Longitude.MIN, Longitude.MAX, 5);

    adverts.push(
      {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        },
        offer: {
          title: 'Лучшее место для отдыха!',
          address: '' + x + ', ' + y,
          price: getRandomInt(1, MAX_PRICE),
          type: getRandomArrayElement(TYPES),
          rooms: getRandomInt(1, MAX_ROOMS),
          guests: getRandomInt(1, MAX_GUESTS),
          checkin: getRandomArrayElement(TIME),
          checkout: getRandomArrayElement(TIME),
          features: shuffleArray(FEATURES).slice(getRandomInt(0, FEATURES.length - 1)),
          description: 'Всё чисто и красиво',
          photos: shuffleArray(PHOTOS).slice(getRandomInt(0, PHOTOS.length - 1)),
        },
        location: {
          x: x,
          y: y,
        },
      },
    );
  }
  return adverts;
}

createAdvert();
