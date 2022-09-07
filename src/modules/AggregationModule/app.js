'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;

var bag = [];

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

        // Act on input messages to the module.
        client.on('inputMessage', function (inputName, msg) {
          pipeMessage(client, inputName, msg);
        });

        setInterval(() => {
          sendMessages(client);
        }, process.env.OUTPUT_FREQUENCY || 1000);
      }
    });
  }
});

// This function just pipes the messages without any change.
function pipeMessage(client, inputName, msg) {
  var msgString = msg.getBytes().toString('utf8');
  var message = JSON.parse(msgString);
  if (message) {
    bag.push(message);
  }
}

function sendMessages(client) {
  var items = [];

  while (bag.length > 0) {
    items.push(bag.shift());
  }

  var outputMsg = new Message(JSON.stringify(items));
  client.sendOutputEvent('output', outputMsg, printResultFor('Sending received messages'));
}

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    }
    if (res) {
      console.log(op + ' status: ' + res.constructor.name);
    }
  };
}
