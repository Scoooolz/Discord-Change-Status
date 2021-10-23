module.exports = () => {
	const fs = require("fs");
	if (
		!fs.existsSync("./config.json") ||
		fs.existsSync("./configschema.json")
	) {
		require("./src/register.js")();
	} else {
		["app", "web"].forEach((more) => {
			require(`./src/${more}`)();
		});
	}
};
