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

const getAvatarsArray = (max) => {
  let avatars = [];

  for (let i = 1; i <= max; i++) {
    if (i < 10) {
      avatars.push(`0${i}`);
    } else {
      avatars.push(`${i}`);
    }
  }

  return avatars;
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const isEscEvent = (evt) => {
  return (evt.key === 'Escape') || (evt.key === 'Esc');
};

const debounce = (fn, wait) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, rest), wait);
  };
};

export { getRandomInt, getRandomNumber, getRandomArrayElement, getAvatarsArray, shuffleArray, isEscEvent, debounce };
