//@format
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3001/');

ws.on('open', _ => ws.send('send me stuff'));
ws.on('message', function incoming(data) {
  console.log('got', data);
});

var done = (function wait() {
  if (!done) setTimeout(wait, 1000);
})();
