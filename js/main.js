import './form.js';
import { disableAdForm } from './form.js';
import { getMap, createPinMarker, disableMapForm } from './map.js';
import { getData } from './server.js';
import { showErrorServerPopup } from './popup.js';


//если инфы нет, поле скрыватся (card)

disableMapForm();
disableAdForm();
getMap();

getData((data) => createPinMarker(data.slice(0, 10)),
  (message) => {
    disableMapForm();
    showErrorServerPopup(message);
  });
