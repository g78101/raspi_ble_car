// Load the TCP Library
net = require('net');
const Datauri = require('datauri');
var RaspiCam = require("raspicam");

var encoding = "jpg";
var pictureFilename = "./picture.jpg";

var opts = {
    mode: "photo",
    encoding: encoding,
    quality: 10,
    width: 400,
    height: 300,
    output: pictureFilename,
    timeout: 1};
var camera = new RaspiCam(opts);

// Start a TCP Server
net.createServer(function (socket) {

  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  socket.write("connected");

  socket.on('data', function (data) {
    var process_id = camera.start( opts );
    const datauri = new Datauri();
    datauri.on('encoded', content => {
      socket.write(content);
      socket.write("S:DONE");
    });
    // datauri.on('error', err => console.log(err));
    datauri.encode(pictureFilename); 
  });

  socket.on('end', function () {
    console.log("disconnect");
  });
}).listen(9487);

console.log("socket Server running at port 9487\n");

// Get Server IP
var os = require('os');
var ifaces = os.networkInterfaces();
var address
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {

      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
      address = iface.address;
    }
    ++alias;
  });
});

// For Get IP
function socketServer() {
  this.ip = address;
}

module.exports = socketServer;
