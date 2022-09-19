const {ungzip} = require('node-gzip');

module.exports = async function (context, eventHubMessages) {    
    eventHubMessages.forEach((message, index) => {
        ungzip(message)
            .then(uncompressed => {
            var event = JSON.parse(uncompressed);

            if (!Array.isArray(event))
                return event; 
    
            context.bindings.outputEventHubMessage = [];
    
            event.forEach(item => {
                context.bindings.outputEventHubMessage.push(JSON.stringify(item));
            });
        });        
    });

    context.done();
};