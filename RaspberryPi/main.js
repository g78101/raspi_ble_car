var bleno = require('bleno');

var CarService = require('./car-service');

var carService = new CarService();

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('control-car', [carService.uuid]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
  
  if (!error) {
    bleno.setServices([
      carService
    ]);
  }
});