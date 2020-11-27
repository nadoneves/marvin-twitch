const tmi = require('tmi.js');
require('dotenv').config()

const lights = require('./service/lights');

const opts = {
	identity: {
		username: process.env.BOT_USERNAME,
		password: process.env.OAUTH_TOKEN
	},
	channels: [
		process.env.CHANNEL_NAME
	]
};

const client = new tmi.client(opts);


client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);


client.connect();


async function onMessageHandler(target, context, msg, self) {
	if (self) { return; } 


    const commandName = msg.trim().split(' ');
    
    console.log(commandName);

	switch (commandName[0]) {
		case "!luz":
			await lights.onOff(commandName[0]);
			break;
		case "!light-color":
			await lights.color('');
            break;
        case "!color":
            await lights.color(commandName[1]);
            break;
        
	
		default:
			break;
	}
}

function onConnectedHandler(addr, port) {
	console.log(`* Connected to ${addr}:${port}`);
}