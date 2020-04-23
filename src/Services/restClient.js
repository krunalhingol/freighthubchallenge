import axios from 'axios';
const BASE_URI = `http://localhost:3000`;

export const objToParams = (obj) => new URLSearchParams(obj).toString();

const promiseReturn = (url, resolve, reject) => {
  axios
    .get(url)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      reject(error.response);
    });
};
export const getShipments = async (pageNumber = 1, pageLimit = 20, id_search = '', sortBy = '', order = '') => {
  const payloadData = {
    _limit: pageLimit,
    _page: pageNumber,
  };
  if (id_search) {
    payloadData['id_like'] = id_search;
  }
  if (sortBy) {
    payloadData['_sort'] = sortBy;
    payloadData['_order'] = order;
  }
  const payloadParams = objToParams(payloadData);
  const url = `${BASE_URI}/shipments?${payloadParams}`;
  return new Promise((resolve, reject) => promiseReturn(url, resolve, reject));
};

export const getShipmentDetails = async (shipmentID) => {
  const url = `${BASE_URI}/shipments/${shipmentID}`;
  return new Promise((resolve, reject) => promiseReturn(url, resolve, reject));
};
