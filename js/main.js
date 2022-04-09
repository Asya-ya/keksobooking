//import './form.js';
import { disableAdForm, submitAdForm, onResetButton } from './form.js';
import { getMap, createPinMarker, disableMapForm, resetPage } from './map.js';
import { getData } from './server.js';
import { showErrorServerPopup } from './popup.js';


//если инфы нет, поле скрыватся (card)

disableMapForm();
disableAdForm();
getMap();
submitAdForm(resetPage);
onResetButton(resetPage);

getData((data) => createPinMarker(data.slice(0, 10)),
  (message) => {
    disableMapForm();
    showErrorServerPopup(message);
  });
