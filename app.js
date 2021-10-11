const fs = require("fs");
const child = require("child_process");

if (!fs.existsSync("./package-lock.json")) {
	console.log("No package detected, installing package...\nThis can take a long...");
	return child.execSync(
		"npm i github:Scoooolz/discord.js-userbot discord.js@12.5.3 express@4.17.1"
	) && console.log("Installing package is complete, Please restart this app.")
}

require("./index.js")();
