//@format
import {fakeFetch} from './fakebackend.js';

const URL = window.location.protocol + '//' + window.location.host + '/do';

function req(type, params) {
  return fakeFetch(URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify({type: type, params: params})
  });
}

function getAsset(assetType, id) {
  return req('getAsset', {type: assetType, id: id});
}

function getAssets(assetType) {
  return req('getAssets', {type: assetType});
}

function getServiceProviders() {
  return req('getParticipants', {type: 'services'});
}

function getCertifierProviders() {
  return req('getParticipants', {type: 'certifiers'});
}

function getNewCars(pId) {
  return req('getNewCars', {id: pId});
}

function getUsedCars(pId) {
  return req('getUsedCars', {id: pId});
}

function transact(pId, type, params) {
  return req('transact', {id: pId, type: type, params: params});
}

export {
  getAsset,
  getAssets,
  getServiceProviders,
  getCertifierProviders,
  getNewCars,
  getUsedCars,
  transact
};
