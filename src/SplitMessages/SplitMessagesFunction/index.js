module.exports = async function (context, eventHubMessages) {    
    eventHubMessages.forEach((message, index) => {
        var event = JSON.parse(message);

        if (!Array.isArray(event))
            return event; 

        context.bindings.outputEventHubMessage = [];

        event.forEach(item => {
            context.bindings.outputEventHubMessage.push(JSON.stringify(item));
        });
    });

    context.done();
};