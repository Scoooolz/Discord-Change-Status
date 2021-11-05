module.exports = () => {
	const { Client } = require("discord.js");
	const client = new Client();
	const variables = require("../config.json");
	const allowUserBotting = require("discord.js-userbot");
	let state = 0;
	const presences = require("../status.json");
	const term = require("terminal-kit").terminal;

	if (variables.BOT === "false") {
		term.brightGreen(
			"User detected by variables. trying to login...\nThis might take a long...\n"
		);
		allowUserBotting(client);
		client.login(variables.TOKEN);
	} else if (variables.BOT === "true") {
		term.brightGreen("Bot detected by variables. trying to login...\n");
		client.login(variables.TOKEN);	
	}
	if (presences.STATUS_NAME === "" || presences.STATUS_TYPE === "")
		return (
			term.red("Please add STATUS_NAME or STATUS_TYPE for continue!") &&
			process.exit()
		);
	if (
		`${presences.STATUS_TYPE}`.toUpperCase() === "STREAMING" &&
		presences.STATUS_TYPE_URL === ""
	)
		return (
			term.red(
				"Please add twitch channel link in STATUS_TYPE_URL to continue for STREAMING!"
			) && process.exit()
		);

	client.on("ready", () => {
		term.green(`Success to change ${client.user.tag} status!\n`);

		setInterval(() => {
			state = (state + 1) % presences.length;
			const presence = presences[state];
			if (presence.STATUS_NAME === "" || presence.STATUS_TYPE === "")
				return (
					term.red(
						"Please add STATUS_NAME or STATUS_TYPE for continue.ss"
					) && process.exit()
				);
			client.user.setActivity(presence.STATUS_NAME, {
				type: `${presence.STATUS_TYPE}`.toUpperCase(),
				url: presence.STATUS_TYPE_URL,
			});
		}, variables.STATUS_DELAY * 1000);
	});
};
