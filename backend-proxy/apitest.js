//@format
/*globals fetch*/

const URL = 'http://localhost:3000/do';
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

function printResponse(resp) {
  resp.json().then(data => console.log(resp.status, data));
}

getAsset('cars', 'c1').then(printResponse);
getAsset('cars', 'c3').then(printResponse);
getAssets('cars').then(printResponse);
getAssets('cars').then(printResponse);
