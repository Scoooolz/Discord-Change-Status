const variables = require("./config.json");
const allowUserBotting = require("discord.js.userbot");

const { Client } = require("discord.js");
const client = new Client();

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
if (variables.STATUS_NAME === "" || variables.STATUS_TYPE === "")
	return console.log("Please add STATUS_NAME or STATUS_TYPE for continue!");
if (variables.STATUS_TYPE === "STREAMING" && variables.STATUS_TYPE_URL === "")
	return console.log(
		"Please add twitch channel link in STATUS_TYPE_URL to continue for STREAMING!"
	);

client.on("ready", () => {
	console.log(`Success to change ${client.user.tag} status!`);

	client.user.setActivity(variables.STATUS_NAME, {
		type: variables.STATUS_TYPE,
		url: variables.STATUS_TYPE_URL,
	});
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