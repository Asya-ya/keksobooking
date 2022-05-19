import { disableAdForm, submitAdForm, onResetButton } from './form.js';
import { getMap, createPinMarker, disableMapForm, resetPage } from './map.js';
import { getData } from './server.js';
import { showErrorServerPopup } from './popup.js';
import { setFilterChange } from './filter.js';
import { debounce } from './util.js'

const RERENDER_DELAY = 500;

disableMapForm();
disableAdForm();
getMap();

getData((data) => {
  createPinMarker(data);

  setFilterChange(debounce(
    () => createPinMarker(data),
    RERENDER_DELAY,
  ));

  submitAdForm(() => {
    resetPage();
    createPinMarker(data);
  });

  onResetButton(() => {
    resetPage();
    createPinMarker(data);
  });
},
(message) => {
  disableMapForm();
  showErrorServerPopup(message);
});
