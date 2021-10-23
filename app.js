const fs = require("fs");
const child = require("child_process");

if (!fs.existsSync("./package-lock.json")) {
	console.log(
		"No package detected, installing package...\nThis can take a long..."
	);
	return (
		child.execSync("npm i").catch(err => {
			return console.log(`An error detected while trying to installing package. Please manually installing package.`)
		}) &&
		console.log("Installing package is complete, Trying to restart app...") &&
		child.execSync("node .").catch(err => {
			return console.log(`An error detected while trying to restarting app. Please manually restart your app.`)
		})
	);
} else {
	require("./index.js")();
}