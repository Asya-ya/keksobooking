const URL_DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_SERVER = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(URL_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(`${response.status}, ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(URL_SERVER,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
