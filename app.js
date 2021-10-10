const { Client } = require("discord.js");
const client = new Client();
const variables = require('./config.json')
const allowUserBotting = require('discord.js-userbot')
let state = 0;
const presences = variables.STATUS

if (variables.BOT === "false") {
	console.log("User detected by variables. trying to login...\nThis might take a long...");
	allowUserBotting(client);
} else if (variables.BOT === "true") {
	console.log("Bot detected by variables. trying to login...");
} else
	return console.error(
		"No BOT variable detected. Please add true or false to continue."
	);
if (variables.TOKEN === "" || !variables.TOKEN)
	return console.log("No token detected. Please add token.");
if (presences.STATUS_NAME === "" || presences.STATUS_TYPE === "")
	return console.log("Please add STATUS_NAME or STATUS_TYPE for continue!");
if (presences.STATUS_TYPE === "STREAMING" && presences.STATUS_TYPE_URL === "")
	return console.log(
		"Please add twitch channel link in STATUS_TYPE_URL to continue for STREAMING!"
	);

client.on("ready", () => {
	console.log(`Success to change ${client.user.tag} status!`);

	setInterval(() => {
		state = (state + 1) % presences.length;
		const presence = presences[state];
	
		client.user.setActivity(presence.STATUS_NAME, { type: presence.STATUS_TYPE, url: presence.STATUS_TYPE_URL });
	}, variables.STATUS_DELAY * 1000);
});

client.login(variables.TOKEN);

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Looks your bot is online!");
});

app.listen(port, () => {
	console.log(`Web is running!`);
});