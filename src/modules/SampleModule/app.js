'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;

Client.fromEnvironment(Transport, function (err, client) {
  if (err) {
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });

    // connect to the Edge instance
    client.open(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('IoT Hub module client initialized');

        setInterval(() => {
          var msg =
          {
            timestamp: new Date().toISOString(),
            data: Math.random()
          }

          var outputMsg = new Message(JSON.stringify(msg));
          client.sendOutputEvent('output', outputMsg);
        }, 10);
      }
    });
  }
});
