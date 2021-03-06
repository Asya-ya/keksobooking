import { sendData } from './server.js';
import { showSuccessPopup, showErrorPopup } from './popup.js';
import { renderPreview } from './render-preview.js';

const MinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
}

const BORDER_COLOR = '#d9d9d3';

const roomCapacity = {
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
const addressInput = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');
const avatarChooser = adForm.querySelector('#avatar');
const avatarWrap = adForm.querySelector('.ad-form-header__preview');
const avatarDefault = avatarWrap.querySelector('img');
const imagesChooser = adForm.querySelector('#images');
const imagesWrap = adForm.querySelector('.ad-form__photo');

// Неактивное состояние формы
const disableForm = (form, elements, classForm) => {
  form.classList.add(`${classForm}--disabled`);

  for (let element of elements) {
    element.disabled = true;
    element.style.pointerEvents = 'none';
  }
};

// Активное состояние формы
const enableForm = (form, elements, classForm) => {
  form.classList.remove(`${classForm}--disabled`);

  for (let element of elements) {
    element.disabled = false;
    element.style.pointerEvents = 'auto';
  }
};

// Добавляет вывод ошибки валидации
const setValidationError = (element, errorText) => {
  element.setCustomValidity(errorText);
  element.style.borderColor = 'red';
};

// Удаляет вывод ошибки валидации
const removeValidationError = (element) => {
  element.setCustomValidity('');
  element.style.borderColor = BORDER_COLOR;
};

// Получает новое значение цены для плейсхолдера и минимального значения
const getNewPrice = () => {
  let newPrice = MinPrice[typeInput.value.toUpperCase()];

  priceInput.min = newPrice;
  priceInput.placeholder = newPrice;
};

// Зависимость поля цены от поля типа жилья
const onTypeInput = () => {
  getNewPrice();
  onPriceInput();
};

// Зависимость значений полей время заезда и время выезда друг от друга
const onTimeinInput = () => {
  timeoutInput.value = timeinInput.value;
};

const onTimeoutInput = () => {
  timeinInput.value = timeoutInput.value;
};

// Валидация поля название
const onTitleInput = () => {
  const valueLength = titleInput.value.length;
  const minLength = titleInput.getAttribute('minlength');
  const maxLength = titleInput.getAttribute('maxlength');

  if (titleInput.validity.tooShort) {
    setValidationError(titleInput, `Минимум ${minLength} символов. Добавьте ещё ${minLength - valueLength} симв.`);
  } else if (titleInput.validity.tooLong) {
    setValidationError(titleInput,  `Максимум ${maxLength} символов. Удалите ещё ${valueLength - maxLength} симв.`);
  } else if (titleInput.validity.valueMissing) {
    setValidationError(titleInput, 'Обязательное поле.');
  } else {
    removeValidationError(titleInput);
  }
};

// Валидация поля цена
const onPriceInput = () => {
  const maxValue = Number(priceInput.getAttribute('max'));
  const minValue = Number(priceInput.getAttribute('min'));
  const value = priceInput.value;

  if (value > maxValue) {
    setValidationError(priceInput, `Максимальное значение - ${maxValue}`);
  } else if (value < minValue) {
    setValidationError(priceInput, `Минимальное значение для выбранного типа жилья - ${minValue}`);
  } else {
    removeValidationError(priceInput);
  }

  priceInput.reportValidity();
};

// Зависимость допустимого количества гостей от числа комнат
const onRoomCapacityInput = () => {
  if (!roomCapacity[roomInput.value].includes(parseInt(capacityInput.value))) {
    setValidationError(capacityInput, 'Недопустимое количество гостей.');
  } else {
    removeValidationError(capacityInput);
  }

  changeCapacityOptions();

  roomInput.reportValidity();
  capacityInput.reportValidity();
};

// Блокировка выбора недопустимого количества гостей
const changeCapacityOptions = () => {
  const capacityOptions = capacityInput.children;

  for (let capacityOption of capacityOptions) {
    if (!roomCapacity[roomInput.value].includes(parseInt(capacityOption.value))) {
      capacityOption.disabled = true;
    } else {
      capacityOption.disabled = false;
    }
  }
};

const getCoordinates = ({lat, lng}) => {
  addressInput.value = `${lat}, ${lng}`;
};

const submitAdForm = (cb) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    sendData(
      () => {
        cb();
        showSuccessPopup();
      },
      showErrorPopup,
      formData);
  });
};

const removePreview = () => {
  const avatarPreview = avatarWrap.querySelector('.preview');
  const imagesPreview = imagesWrap.querySelector('.preview');

  if (avatarPreview) {
    avatarPreview.remove();
    avatarWrap.append(avatarDefault);
  }

  if (imagesPreview) {
    imagesPreview.remove();
  }
};

const onResetButton = (cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
  });
};

changeCapacityOptions();
typeInput.addEventListener('change', onTypeInput);
timeinInput.addEventListener('change', onTimeinInput);
timeoutInput.addEventListener('change', onTimeoutInput);
titleInput.addEventListener('input', onTitleInput);
priceInput.addEventListener('input', onPriceInput);
roomInput.addEventListener('change', onRoomCapacityInput);
capacityInput.addEventListener('change', onRoomCapacityInput);
avatarChooser.addEventListener('change', () => {
  const avatar = avatarChooser.files[0];
  renderPreview(avatar, avatarWrap, 'Аватар пользователя');
});
imagesChooser.addEventListener('change', () => {
  const image = imagesChooser.files[0];
  renderPreview(image, imagesWrap, 'Фотография жилья');
});

const disableAdForm = () => disableForm(adForm, adFormElements, adForm.classList[0]);
const enableAdForm = () => enableForm(adForm, adFormElements, adForm.classList[0]);

export { disableForm, enableForm, disableAdForm, enableAdForm, submitAdForm, getCoordinates, onResetButton, removePreview, getNewPrice, adForm };
