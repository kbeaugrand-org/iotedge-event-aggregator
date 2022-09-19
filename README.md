# IoT Edge Event Aggregation sample

This project is a sample demonstrating how to aggregate events from IoT Edge.

## Usage

To use the module, you need to deploy the following Azure IoT Edge module:

```json
 "AggregationModule": {
        "restartPolicy": "always",
        "settings": {
            "image": "ghcr.io/kbeaugrand-org/azure-iotedge-aggregationmodule:latest",
            "createOptions": "{}"
        },
        "status": "running",
        "type": "docker",
        "env": {
          "OUTPUT_FREQUENCY" : {
            "value": "1000"
          }
        }
    }
```

### Edge Hub routing

```json
    "routes": {
        "EdgeModuleToAggregation": "FROM /messages/modules/* INTO BrokeredEndpoint(\"/modules/AggregationModule/inputs/inputMessage\")",
        "AggregationModuleToUpstream": "FROM /messages/modules/AggregationModule/outputs/* INTO $upstream"
    },
```

### Environment variables

```OUTPUT_FREQUENCY```: The frequency in milliseconds to aggregate events.

## License

This project is licensed under the MIT License (see [./LICENSE.md](LICENSE.md)) for more details.
