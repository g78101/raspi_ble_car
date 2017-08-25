var util = require('util');
var bleno = require('bleno');
var BlenoCharacteristic = bleno.Characteristic;
var SocketServer = require('./socketServer'); // Create Socket Server 

var GpioManager = require('./gpioManager');

function ImageCharacteristic() {
  ImageCharacteristic.super_.call(this, {
    uuid: '0001',
    properties: ['notify'],
    value: null
  });
  this.socketServer = new SocketServer();
  GpioManager.LedWaitingStatus();
}

util.inherits(ImageCharacteristic, BlenoCharacteristic);

ImageCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('ImageCharacteristic - onsubscribe');
  GpioManager.LedKeepLighting();
  updateValueCallback((new Buffer(this.socketServer.ip)));
};

ImageCharacteristic.prototype.onUnsubscribe = function() {
  console.log('ImageCharacteristic - onUnsubscribe');
  GpioManager.LedWaitingStatus();
};
module.exports = ImageCharacteristic;
