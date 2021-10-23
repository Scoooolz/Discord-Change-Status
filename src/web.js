module.exports = () => {
	const express = require("express");
	const app = express();
	const port = 3000;

	app.get("/", (req, res) => {
		res.send("Looks your bot is online!");
	});

	app.listen(port, () => {
		console.log(`Web is running!`);
	});
};
