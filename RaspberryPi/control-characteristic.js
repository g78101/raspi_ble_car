var util = require('util');

var bleno = require('bleno');
var BlenoCharacteristic = bleno.Characteristic;

var GpioManager = require('./gpioManager');

function ControlCharacteristic() {
  ControlCharacteristic.super_.call(this, {
    uuid: '0000',
    properties: ['write'],
    value: null
  });
}

util.inherits(ControlCharacteristic, BlenoCharacteristic);

ControlCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {

  var str = data.toString('hex');
  var Lwheel = str.substr(0,2);
  var Rwheel = str.substr(2,2);

// Stop:     0xFF
// Forward:  0x0F
// Backward: 0x00

  switch(Lwheel) {
    case "0f":
      GpioManager.LeftWheelForWard();
      break;
    case "00":
      GpioManager.LeftWheelBackWard();
      break;
    default:
      GpioManager.LeftWheelStop();
  }

  switch(Rwheel) {
    case "0f":
      GpioManager.RightWheelForWard();
      break;
    case "00":
      GpioManager.RightWheelBackWard();
      break;
    default:
      GpioManager.RightWheelStop();
  }
  
  callback(this.RESULT_SUCCESS);
};

module.exports = ControlCharacteristic;
