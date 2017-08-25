var gpio = require('rpi-gpio');

var LEDPin = 32;
var LBPin = 11; // 4
var LFPin = 13; // 3
var RBPin = 16; // 2
var RFPin = 18; // 1
var delay = 500;
var keep = false;

module.exports = {

LedWaitingStatus : function() {
  keep = false;
  gpio.setup(LEDPin, gpio.DIR_OUT, on);
  function on() {
        setTimeout(function() {
        gpio.write(LEDPin, true, off);
    }, delay);
  }

  function off() {
    setTimeout(function() {
        if ( keep ) {
          return;
        }
        gpio.write(LEDPin, false, on);
    }, delay);
  }
},

LedKeepLighting : function() {
  keep = true;
  gpio.setup(LEDPin, gpio.DIR_HIGH, callback);
  function callback() {
    gpio.write(LEDPin, true);
  }
},

LeftWheelForWard : function() {
  gpio.setup(LFPin, gpio.DIR_HIGH, function(){gpio.write(LFPin, true);});
  gpio.setup(LBPin, gpio.DIR_HIGH, function(){gpio.write(LBPin, false);});
},

LeftWheelBackWard : function() {
  gpio.setup(LFPin, gpio.DIR_HIGH, function(){gpio.write(LFPin, false);});
  gpio.setup(LBPin, gpio.DIR_HIGH, function(){gpio.write(LBPin, true);});
},

LeftWheelStop : function() {
  gpio.setup(LFPin, gpio.DIR_HIGH, function(){gpio.write(LFPin, false);});
  gpio.setup(LBPin, gpio.DIR_HIGH, function(){gpio.write(LBPin, false);});
},

RightWheelForWard : function() {
  gpio.setup(RFPin, gpio.DIR_HIGH, function(){gpio.write(RFPin, true);});
  gpio.setup(RBPin, gpio.DIR_HIGH, function(){gpio.write(RBPin, false);});
},

RightWheelBackWard : function() {
  gpio.setup(RFPin, gpio.DIR_HIGH, function(){gpio.write(RFPin, false);});
  gpio.setup(RBPin, gpio.DIR_HIGH, function(){gpio.write(RBPin, true);});
},

RightWheelStop : function() {
  gpio.setup(RFPin, gpio.DIR_HIGH, function(){gpio.write(RFPin, false);});
  gpio.setup(RBPin, gpio.DIR_HIGH, function(){gpio.write(RBPin, false);});
},

};
