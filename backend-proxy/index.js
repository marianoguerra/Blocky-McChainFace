//@format
/*globals console, require*/
const express = require('express'),
  WebSocket = require('ws'),
  cors = require('cors');

const app = express(),
  port = 3000,
  corsOptions = {
    origin: '*'
  };

app.use(express.json());
app.use(cors(corsOptions));

const ASSETS = {
  cars: {
    c1: {
      brand: 'Mercedes Benz',
      model: 'Class A',
      year: 2017,
      color: 'Red'
    },
    c2: {
      brand: 'Mercedes Benz',
      model: 'Class B',
      year: 2016,
      color: 'Blue'
    }
  },
  robot: {
    r1: {
      type: 'Painter',
      model: 'm123'
    },
    r2: {
      type: 'Welder',
      model: 'w321'
    }
  }
};

function handleTransfer(_request, response, _data) {
  response.status(200).send({result: 'transfer_ok'});
}

function handleGetAsset(_request, response, data) {
  const params = data.params,
    assetType = params.type,
    id = params.id,
    assetsOfType = ASSETS[assetType];

  if (assetsOfType === undefined) {
    notFound(response, 'invalid-asset-type');
  } else {
    const asset = assetsOfType[id];

    if (asset === undefined) {
      notFound(response, 'invalid-asset-id');
    } else {
      reply(response, {data: asset});
    }
  }
}

function handleGetAssets(_request, response, data) {
  const params = data.params,
    assetType = params.type,
    assetsOfType = ASSETS[assetType];

  if (assetsOfType === undefined) {
    notFound(response, 'invalid-asset-type');
  } else {
    reply(response, {data: assetsOfType});
  }
}

const DO_HANDLERS = {
  transfer: handleTransfer,
  getAsset: handleGetAsset,
  getAssets: handleGetAssets
};

function notFound(response, reason) {
  response.status(404).send({error: true, reason: reason});
}

function reply(response, data) {
  response.status(200).send(data);
}

function handleDo(request, response, data) {
  const handler = DO_HANDLERS[data.type];

  if (handler) {
    return handler(request, response, data);
  } else {
    notFound(response, 'invalid-action-type');
  }
}

app.post('/do', function(request, response) {
  const data = request.body;
  response.send(handleDo(request, response, data));
});

const wss = new WebSocket.Server({port: 3001});

const WS_SERVER_URL = 'ws://localhost:3002/';

let connIdGen = 0;

wss.on('connection', function connection(ws) {
  const connId = connIdGen++,
    connections = [];
  console.log('connection', connId);
  // on message from the frontend
  ws.on('message', function incoming(_message) {
    // connect to the backend
    const wsProxy = new WebSocket(WS_SERVER_URL);

    connections.push(wsProxy);
    // on message from the backend
    wsProxy.on('message', function incoming(data) {
      // send the data to the frontend
      ws.send(data.toUpperCase());
    });
  });

  // on frontend connection close
  ws.on('close', function close() {
    // close connections with the backend
    connections.forEach(wsProxy => wsProxy.close());
  });
});

app.listen(port, () => console.log(`backend-proxy listening on port ${port}!`));
