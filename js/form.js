const MinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 3000,
  hotel: 5000,
  palace: 10000,
}

const RoomCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
}

const adForm = document.querySelector('.ad-form');
const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeinInput = adForm.querySelector('#timein');
const timeoutInput = adForm.querySelector('#timeout');
const adFormElements = adForm.querySelectorAll('fieldset');
const titleInput = adForm.querySelector('#title');
const roomInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');

// Неактивное состояние формы
const disableForm = (form, elements, classForm) => {
  form.classList.add(`${classForm}--disabled`);

  for (let element of elements) {
    element.disabled = true;
  }
}

// Активное состояние формы
const enableForm = (form, elements, classForm) => {
  form.classList.remove(`${classForm}--disabled`);

  for (let element of elements) {
    element.disabled = false;
  }
}

// Зависимость поля цены от поля типа жилья
const onTypeInput = () => {
  let newPrice = MinPrice[typeInput.value];

  priceInput.min = newPrice;
  priceInput.placeholder = newPrice;
}

// Зависимость значений полей время заезда и время выезда друг от друга
const onTimeinInput = () => {
  timeoutInput.value = timeinInput.value;
}

const onTimeoutInput = () => {
  timeinInput.value = timeoutInput.value;
}

// Валидация полей форм
const onTitleInput = () => {
  const valueLength = titleInput.value.length;
  const minLength = titleInput.getAttribute('minlength');
  const maxLength = titleInput.getAttribute('maxlength');

  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Минимум ' + minLength + ' символов. Добавьте ещё ' + (minLength - valueLength) + ' симв.');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Максимум ' + maxLength + ' символов. Удалите ' + (valueLength - maxLength) + ' симв.');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле.');
  } else {
    titleInput.setCustomValidity('');
  }
}

const onPriceInput = () => {
  const maxValue = Number(priceInput.getAttribute('max'));
  const minValue = Number(priceInput.getAttribute('min'));
  const value = priceInput.value;

  if (value > maxValue) {
    priceInput.setCustomValidity('Максимальное значение - ' + maxValue);
  } else if (value < minValue) {
    priceInput.setCustomValidity('Минимальное значение для выбранного типа жилья - ' + minValue);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
}

// Зависимость допустимого количества гостей от числа комнат
const onRoomCapacityInput = () => {
  if (!RoomCapacity[roomInput.value].includes(parseInt(capacityInput.value))) {
    capacityInput.setCustomValidity('Недопустимое количество гостей');
  } else {
    capacityInput.setCustomValidity('');
  }

  changeCapacityOptions();

  roomInput.reportValidity();
  capacityInput.reportValidity();
}

// Блокировка выбора недопустимого количества гостей
const changeCapacityOptions = () => {
  const capacityOptions = capacityInput.children;

  for (let capacityOption of capacityOptions) {
    if (!RoomCapacity[roomInput.value].includes(parseInt(capacityOption.value))) {
      capacityOption.disabled = true;
    } else {
      capacityOption.disabled = false;
    }
  }
}

changeCapacityOptions();
typeInput.addEventListener('change', onTypeInput);
timeinInput.addEventListener('change', onTimeinInput);
timeoutInput.addEventListener('change', onTimeoutInput);
titleInput.addEventListener('input', onTitleInput);
priceInput.addEventListener('input', onPriceInput);
roomInput.addEventListener('change', onRoomCapacityInput);
capacityInput.addEventListener('change', onRoomCapacityInput);

// Неактивное состояние формы до загрузки карты
disableForm(adForm, adFormElements, adForm.classList[0]);

export { disableForm, enableForm, adForm, adFormElements};
