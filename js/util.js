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

export { getRandomInt, getRandomNumber, getRandomArrayElement, shuffleArray };
