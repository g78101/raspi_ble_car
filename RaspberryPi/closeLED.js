var gpio = require('rpi-gpio');
var pin =32;
gpio.setup(pin, gpio.DIR_HIGH, callback);

function callback() {
    gpio.write(pin, false);
    gpio.destroy();
}
