//@format
const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 3002});

let connIdGen = 0;

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  const connId = connIdGen++;

  console.log('connection', connId);
  let count = 0;
  const timerId = setInterval(() => {
    count += 1;
    console.log('send', connId, count);
    ws.send(JSON.stringify({count: count, connId: connId}));
  }, 1000);

  ws.on('close', function close() {
    clearInterval(timerId);
  });
});
