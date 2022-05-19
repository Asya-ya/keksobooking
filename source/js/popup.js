import { isEscEvent } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorContainer = document.querySelector('.map__filters-container');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

let popup = null;

const closePopup = (evt) => {
  if ((isEscEvent(evt)) || (evt.type === 'click')) {
    evt.preventDefault();
    popup.remove();
    document.removeEventListener('keydown', closePopup);
    document.removeEventListener('click', closePopup);
  }
};

const showSuccessPopup = () => {
  popup = successTemplate.cloneNode(true);
  document.body.append(popup);

  document.addEventListener('keydown', closePopup);
  document.addEventListener('click', closePopup);
};

const showErrorPopup = () => {
  const errorButton = errorTemplate.querySelector('.error__button');
  popup = errorTemplate.cloneNode(true);
  document.body.append(popup);

  document.addEventListener('keydown', closePopup);
  document.addEventListener('click', closePopup);
  errorButton.addEventListener('click', () => popup.remove());
};

const showErrorServerPopup = (err) => {
  errorContainer.style.position = 'relative';

  const errorPopup = document.createElement('div');
  errorPopup.style.zIndex = 3;
  errorPopup.style.position = 'absolute';
  errorPopup.style.left = 0;
  errorPopup.style.top = 0;
  errorPopup.style.right = 0;
  errorPopup.style.bottom = 0;
  errorPopup.style.backgroundColor = '#000000';
  errorPopup.style.color = '#f0f0ea';
  errorPopup.style.textAlign = 'center';
  errorPopup.style.lineHeight = '50px';
  errorPopup.textContent = `Ошибка загрузки данных. ${err}`;

  errorContainer.append(errorPopup);
};

export { showErrorServerPopup, showSuccessPopup, showErrorPopup }
