var util = require('util');

var bleno = require('bleno');
var BlenoPrimaryService = bleno.PrimaryService;

var ControlCharacteristic = require('./control-characteristic');
var ImageCharacteristic = require('./image-characteristic');

function CarService() {
  CarService.super_.call(this, {
    uuid: '01010101010101010101010101010101',
    characteristics: [
      new ControlCharacteristic(),
      new ImageCharacteristic()
    ]
  });
}

util.inherits(CarService, BlenoPrimaryService);

module.exports = CarService;
