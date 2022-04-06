//const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorContainer = document.querySelector('.map__filters-container');

// const showErrorPopup = (err) => {
//   const errorPopup = errorTemplate.cloneNode(true);
//   errorPopup.querySelector('.error__message').textContent = `Ошибка загрузки данных. ${err}`;

//   document.body.appendChild(errorPopup);
// }

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
}

export { showErrorServerPopup }
