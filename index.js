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


	const commandName = msg.trim();

	switch (commandName) {
		case "!light-on":
			await lights.on();
			break;
		case "!light-off":
			await lights.off();
			break;
		case "!light-color":
			await lights.color();
			break;
	
		default:
			break;
	}
}

function onConnectedHandler(addr, port) {
	console.log(`* Connected to ${addr}:${port}`);
}