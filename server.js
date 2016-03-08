var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cv = require('opencv');
var window = new cv.NamedWindow('Video', 0);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('image', function(msg) {
    console.log('got buffer');
    try{
      var buff = msg.buffer;
      cv.readImage(buff, function(err, im) {
        console.log(im.size());
        if (im.size()[0] > 0 && im.size()[1] > 0){
          window.show(im);
          window.blockingWaitKey(0, 50);
        }
      })
    } catch (e) {

    }
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
