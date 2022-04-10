//import './form.js';
import { disableAdForm, submitAdForm, onResetButton } from './form.js';
import { getMap, createPinMarker, disableMapForm, resetPage } from './map.js';
import { getData } from './server.js';
import { showErrorServerPopup } from './popup.js';
import { setFilterChange } from './filter.js';
import { debounce } from './util.js'


//если инфы нет, поле скрыватся (card)
//именование перечислений (card)
//координаты центра
//закрыть балун при смене фильтра
//evry

const RERENDER_DELAY = 500;

disableMapForm();
disableAdForm();
getMap();
submitAdForm(resetPage);
onResetButton(resetPage);

getData((data) => {
  createPinMarker(data);
  setFilterChange(debounce(
    () => createPinMarker(data),
    RERENDER_DELAY,
  ));
},
(message) => {
  disableMapForm();
  showErrorServerPopup(message);
});
