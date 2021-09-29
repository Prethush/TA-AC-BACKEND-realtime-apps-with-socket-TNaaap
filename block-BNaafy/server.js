let express = require('express');
const { fstat } = require('fs');
let http = require('http');
let fs = require('fs');

let app = express();
let server = http.createServer(app);
let io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  socket.on("chat-message", (msg) => {
   io.emit("chat-message", msg);
  })
  socket.on('disconnect', () => {
    console.log(" a user is disconnected");
  })
});

// routing middlewares
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// fs.watchFile('./index.html', {interval: 1000}, (stats) => {
//   io.on("chat-message", (msg) => {
//     io.emit("chat-message", msg);
//   })
// })

server.listen(3000, () => {
  console.log("Server is listening on port 3k");
});

