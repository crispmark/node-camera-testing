var cv = require('opencv');

var io = require('socket.io-client')('http://localhost:3000');

//establish connection to server
var socket = io.connect();

try {
  var camera = new cv.VideoCapture(0);

  setInterval(function() {
    camera.read(function(err, im) {
      if (err) throw err;
      if (im.size()[0] > 0 && im.size()[1] > 0){
        var buff = im.toBuffer();
        var msg = {image: true, buffer: buff};
        socket.emit('image', msg);
      }
    });
  }, 200);

} catch (e) {
  console.log("Couldn't start camera:", e)
}
