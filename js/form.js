const adForm = document.querySelector('.ad-form');
const typeInput = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeinInput = adForm.querySelector('#timein');
const timeoutInput = adForm.querySelector('#timeout');
const adFormElements = adForm.querySelectorAll('fieldset');

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

export { disableForm, enableForm, adForm, adFormElements};
