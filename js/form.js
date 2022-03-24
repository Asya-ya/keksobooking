const adForm = document.querySelector('.ad-form');
const inputType = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const inputTimein = adForm.querySelector('#timein');
const inputTimeout = adForm.querySelector('#timeout');

inputType.addEventListener('change', () => {
  let newPrice = 0;

  switch(inputType.value) {
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

  inputPrice.min = newPrice;
  inputPrice.placeholder = newPrice;
});

inputTimein.addEventListener('change', () => {
  inputTimeout.value = inputTimein.value;
});

inputTimeout.addEventListener('change', () => {
  inputTimein.value = inputTimeout.value;
})
