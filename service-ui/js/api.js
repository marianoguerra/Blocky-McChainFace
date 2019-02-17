const URL = window.location.protocol + '://' + window.location.hostname + ':8080/do';
function req(type, params) {
  return fetch(URL, {
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

function getOpenOrders(pId) {
    return req('getOpenOrders', {id: pId});
}

function transact(pId, type, params) {
    return req('transact', {id: pId, type: type, params: params});
}

export {getAsset, getAssets, getOpenOrders, transact};
