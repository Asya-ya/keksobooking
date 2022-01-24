const getRandomInt = (min, max) => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    return -1;
  } else if (min < 0 || max < 0) {
    return -1;
  } else if (min >= max) {
    return -1;
  } else {
    return Math.floor(Math.random(min, max) * (max - min + 1) + min);
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
    return +(Math.random(min, max) * (max - min + 1) + min).toFixed(decimalPoint);
  }
};

getRandomInt(0, 10);
getRandomNumber(0, 25,5);
