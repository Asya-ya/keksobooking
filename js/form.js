const adForm = document.querySelector('.ad-form');
const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeinInput = adForm.querySelector('#timein');
const timeoutInput = adForm.querySelector('#timeout');
const adFormElements = adForm.querySelectorAll('fieldset');
const titleInput = adForm.querySelector('#title');
const roomInput = adForm.querySelector('#room_number');
const capacityInput = adForm.querySelector('#capacity');
//const capacityOptions = capacityInput.children;

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

typeInput.addEventListener('change', () => {
  let newPrice = 0;

  switch(typeInput.value) {
    case 'flat':
      newPrice = 1000;
      break;
    case 'hotel':
      newPrice = 3000;
      break;
    case 'house':
      newPrice = 5000;
      break;
    case 'palace':
      newPrice = 10000;
      break;
  }

  priceInput.min = newPrice;
  priceInput.placeholder = newPrice;
});

timeinInput.addEventListener('change', () => {
  timeoutInput.value = timeinInput.value;
});

timeoutInput.addEventListener('change', () => {
  timeinInput.value = timeoutInput.value;
})

disableForm(adForm, adFormElements, adForm.classList[0]);

titleInput.addEventListener('input', () => {
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
});

priceInput.addEventListener('input', () => {
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
});

const onRoomCapacityInput = () => {
  if (roomInput.value === '1' && capacityInput.value !== '1') {
    capacityInput.setCustomValidity('В 1 комнате можно расположить только 1 гостя');
  } else if (roomInput.value === '2' && capacityInput.value !== '1' && capacityInput.value !== '2') {
    capacityInput.setCustomValidity('В 2 комнатах можно расположить 1 или 2 гостей');
  } else if (roomInput.value === '3' && capacityInput.value !== '1' && capacityInput.value !== '2' && capacityInput.value !== '3') {
    capacityInput.setCustomValidity('В 3 комнатах можно расположить от 1 до 3 гостей');
  } else if (roomInput.value === '100' && capacityInput.value !== '0') {
    capacityInput.setCustomValidity('100 комнат не для гостей');
  } else {
    capacityInput.setCustomValidity('');
  }

  roomInput.reportValidity();
  capacityInput.reportValidity();
}


roomInput.addEventListener('change', onRoomCapacityInput);
capacityInput.addEventListener('change', onRoomCapacityInput);

export { disableForm, enableForm, adForm, adFormElements};
