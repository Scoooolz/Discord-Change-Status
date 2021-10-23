module.exports = () => {
	const { Client } = require("discord.js");
	const client = new Client();
	const variables = require("../config.json");
	const allowUserBotting = require("discord.js-userbot");
	let state = 0;
	const presences = require('../status.json')
	const term = require('terminal-kit').terminal;

	if (variables.BOT === "false") {
		term.brightGreen(
			"User detected by variables. trying to login...\nThis might take a long...\n"
		);
		allowUserBotting(client);
	} else if (variables.BOT === "true") {
		term.brightGreeng("Bot detected by variables. trying to login...\n");
	} else
		return term.red(
			"No BOT variable detected. Please add true or false to continue."
		) && process.exit();
	if (variables.TOKEN === "" || !variables.TOKEN)
		return term.red("No token detected. Please add the token.") && process.exit();
	if (presences.STATUS_NAME === "" || presences.STATUS_TYPE === "")
		return term.red(
			"Please add STATUS_NAME or STATUS_TYPE for continue!"
		) && process.exit();
	if (
		presences.STATUS_TYPE === "STREAMING" &&
		presences.STATUS_TYPE_URL === ""
	)
		return term.red(
			"Please add twitch channel link in STATUS_TYPE_URL to continue for STREAMING!"
		) && process.exit();

	client.on("ready", () => {
		console.log(`Success to change ${client.user.tag} status!`);
		if (variables.STATUS_DELAY < 15)
			term.red(
				"Settings under 15 in STATUS_DELAY is not recommended.\nYou can change it to under 15 seconds before you got ban."
			) && process.exit();

		setInterval(() => {
			state = (state + 1) % presences.length;
			const presence = presences[state];

			client.user.setActivity(presence.STATUS_NAME, {
				type: presence.STATUS_TYPE,
				url: presence.STATUS_TYPE_URL,
			});
		}, variables.STATUS_DELAY * 1000);
	});

	client.login(variables.TOKEN);
};
