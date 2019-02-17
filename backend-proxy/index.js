//@format
/*globals console, require*/
const express = require('express'),
  WebSocket = require('ws'),
  cors = require('cors');

const app = express(),
  port = 8080,
  SERVER_HOST = process.env.SERVER_HOST || 'localhost',
  corsOptions = {
    origin: '*'
  };

app.use(express.json());
app.use(cors(corsOptions));
app.use('/service/', express.static('../service-ui/'));
app.use('/', express.static('../mobile-fe/build/'));
app.use('/owner/', express.static('../user-ui/'));

const ASSETS = {
  cars: {
    c1: {
      brand: 'Mercedes Benz',
      model: 'Class A',

      year: 2017,
      plate: 'BB-3456-AH',
      color: 'Gray',
      img:
        'https://www.lueg.de/fileadmin/_processed_/f/5/csm_mercedes-benz-a-klasse-edition-1-exterieur-content-16-9_f6ea1bccbd.jpg',
      transactions: [
        {
          name: '2017/11',
          date: '2017-11-19',
          Km: 20,
          Milestone: 'Aquisition',
          By: 'Dealership',
          Owner: 'John Doe'
        },
        {
          name: '2018/03',
          date: '2018-03-19',
          Km: 2385,
          onTime: true,
          Milestone: 'Scheduled maintainance',
          By: 'Official Service shop',
          Owner: 'John Doe'
        },
        {
          name: '2018/06',
          date: '2018-06-19',
          Km: 5000,
          Milestone: 'Breakage',
          By: 'Car shop',
          Owner: 'John Doe'
        },
        {
          name: '2018/12',
          date: '2018-12-19',
          Km: 6580,
          Milestone: 'Emmissions Check',
          By: 'TÜV',
          Owner: 'John Doe'
        },
        {
          name: '2019/01',
          date: '2019-01-19',
          Km: 7500,
          Milestone: 'Ownership Transfer',
          By: 'TÜV',
          Owner: 'Thomas Müller'
        },
        {
          name: '2019/03',
          date: '2019-03-19',
          Km: 8000,
          Milestone: 'Scheduled maintainance',
          By: 'ATU',
          Owner: 'Thomas Müller'
        },
        {
          name: '2018/09',
          date: '2018-09-09',
          Km: 10000,
          Milestone: 'Service ATU',
          onTime: true,
          By: 'ATU',
          Owner: 'Thomas Müller'
        },
        {
          name: '2017/11',
          date: '2017-11-19',
          Km: 20,
          Milestone: 'Aquisition',
          By: 'Dealership',
          Owner: 'John Doe'
        },
        {
          name: '2018/03',
          date: '2018-03-19',
          Km: 2385,
          onTime: true,
          Milestone: 'Scheduled maintainance',
          By: 'Official Service shop',
          Owner: 'John Doe'
        },
        {
          name: '2018/06',
          date: '2018-06-19',
          Km: 5000,
          Milestone: 'Breakage',
          By: 'Car shop',
          Owner: 'John Doe'
        },
        {
          name: '2018/12',
          date: '2018-12-19',
          Km: 6580,
          Milestone: 'Emmissions Check',
          By: 'TÜV',
          Owner: 'John Doe'
        },
        {
          name: '2019/01',
          date: '2019-01-19',
          Km: 7500,
          Milestone: 'Ownership Transfer',
          By: 'TÜV',
          Owner: 'Thomas Müller'
        },
        {
          name: '2019/03',
          date: '2019-03-19',
          Km: 8000,
          Milestone: 'Scheduled maintainance',
          By: 'Official Service shop',
          Owner: 'Thomas Müller'
        },
        {
          name: '2018/09',
          date: '2018-09-09',
          Km: 10000,
          Milestone: 'Service ATU',
          onTime: true,
          By: 'ATU',
          Owner: 'Thomas Müller'
        }
      ]

      //       Transaction: David → relevant selling details → Adam
      // #last date of service → 09.09.2018
      // #Service performed on time
      // #Current amount of kilometers: 100.000km
      // #Date of first registration → 01/2016
      // #Date of next examination → 10/2019
      // #Emission key (sticker colour) → 30
      // #Equipment --> Sports Edition, Parking Assistent - new added Sound System
      // #upgraded Equpment → soundystem
    },
    c2: {
      brand: 'Mercedes Benz',
      model: 'Class C',
      img:
        'https://cdn.meinauto.de/car-pics/___Pix-NoBrand/MERCEDES/C-CLASS/4/5Wagon%20Avantgarde/mercedes_15c220avantgardewg4b_angularfront_nb-298.jpg',
      year: 2016,
      plate: 'BB-1234-AH',
      color: 'Black',
      transactions: [
        {
          name: '2018/11',
          date: '2018-11-19',
          Km: 15,
          Milestone: 'Acquisition',
          By: 'Dealership',
          Owner: 'Christian White'
        },
        {
          name: '2018/03',
          date: '2018-03-19',
          Km: 3056,
          onTime: true,
          Milestone: 'Scheduled maintainance',
          By: 'Official Service shop',
          Owner: 'Christian White'
        },
        {
          name: '2019/06',
          date: '2019-06-19',
          Km: 6780,
          Milestone: 'Breakage',
          By: 'Car shop',
          Owner: 'Christian White'
        },
        {
          name: '2019/12',
          date: '2019-12-19',
          Km: 6980,
          Milestone: 'Emmissions Check',
          By: 'Car Notary',
          Owner: 'Christian White'
        },
        {
          name: '2019/12',
          date: '2019-12-19',
          Km: 6980,
          Milestone: 'Service ATU',
          By: 'ATU',
          Owner: 'Christian White'
        },
        {
          name: '2020/01',
          date: '2020-01-19',
          Km: 10675,
          Milestone: 'Ownership Transfer',
          By: 'Car Notary',
          Owner: 'Paul Black'
        },
        {
          name: '2020/03',
          date: '2020-03-19',
          Km: 56788,
          Milestone: 'Scheduled maintainance',
          By: 'Official Service shop',
          Owner: 'Paul Black'
        }
      ]
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

const ORDERS = {
  tuv: {
    o1_1: {
      car: {
        name: 'Mercedes Class A',
        code: 'mb-class-a'
      }
    },
    o1_2: {
      car: {
        name: 'Mercedes Class B',
        code: 'mb-class-b'
      }
    },
    o1_3: {
      car: {
        name: 'Mercedes Class C',
        code: 'mb-class-c'
      }
    },
    o1_4: {
      car: {
        name: 'Mercedes E',
        code: 'mb-class-e'
      }
    },
    o1_5: {
      car: {
        name: 'Mercedes S',
        code: 'mb-class-s'
      }
    },
    o1_6: {
      car: {
        name: 'Mercedes GLE',
        code: 'mb-gle'
      }
    }
  },
  atu: {
    o2_6: {
      car: {
        name: 'Mercedes GLE',
        code: 'mb-gle'
      }
    },
    o2_4: {
      car: {
        name: 'Mercedes Class E',
        code: 'mb-class-e'
      }
    },
    o2_5: {
      car: {
        name: 'Mercedes Class S',
        code: 'mb-class-s'
      }
    }
  }
};

const PARTICIPANTS = {
  services: {
    atu: {
      name: 'ATU'
    },
    mercedesService: {
      name: 'Mercedes Service'
    }
  },
  certifiers: {
    tuvRL: {
      name: 'TÜV Rheinland'
    },
    tuvS: {
      name: 'TÜV Süd'
    }
  }
};

function handleGetParticipants(_request, response, data) {
  const type = data.params.type,
    items = PARTICIPANTS[type];

  if (items) {
    reply(response, {data: items});
  } else {
    notFound(response, 'invalid-participant-type');
  }
}

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

function handleGetOpenOrders(_request, response, data) {
  const pOrders = ORDERS[data.params.id];

  if (pOrders) {
    return reply(response, pOrders);
  } else {
    return notFound(response, 'invalid-participant-id');
  }
}

function handleTransact(_request, response, data) {
  console.log('transact!', data);
  reply(response, {ok: true});
}

const DO_HANDLERS = {
  transfer: handleTransfer,
  getAsset: handleGetAsset,
  getAssets: handleGetAssets,
  getOpenOrders: handleGetOpenOrders,
  getParticipants: handleGetParticipants,
  transact: handleTransact
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

const wss = new WebSocket.Server({port: 8081});

const WS_SERVER_URL = 'ws://' + SERVER_HOST + ':8082/';

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
