var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
});

var server = app.listen(6789, function() {
 console.log("listening on port 6789");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Lolmon");
  console.log(socket.id);
  
  socket.on("photo", function (data) {
	  console.log("receiving from ios");
	  socket.broadcast.emit("image", data); 
	});
});