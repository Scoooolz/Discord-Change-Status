module.exports = () => {
	const fs = require("fs");
	const term = require("terminal-kit").terminal;
	const child = require("child_process");

	term.brightYellow(
		"First installations detected. Loading automatic installations. You can cancel this Automatic installations by clicking Q."
	);

	term.on("key", function (name, matches, data) {
		if (name === "q") {
			return term.brightBlue("\n\nSee ya!") && process.exit();
		}
	});

	let oneCode = null;
	let twoCode = null;
	let threeCode = null;
	let finalCode = null;

	one();

	function one() {
		term.brightCyan("\nAre you using bot? [Y/N]");
		term.yesOrNo(
			{
				yes: ["y"],
				no: ["n"],
			},
			function (error, result) {
				if (result) {
					oneCode = "true";
					two();
				} else {
					term.red(
						"\nWarning! the discord ToS you can't bot yourself, if you get ban, the creator will not responsible. Do you want to continue? [Y/N]"
					);
					term.yesOrNo(
						{
							yes: ["y"],
							no: ["n"],
						},
						function (error, result) {
							if (result) {
								oneCode = "false";
								two();
							} else {
								term.cyan("\nNow you are using bot.");
								oneCode = "true";
								two();
							}
						}
					);
				}
			}
		);
	}

	function two() {
		term.brightCyan("\nPlease add the user/bot token: ");
		term.inputField(function (error, input) {
			if (input === "") {
				return term.red("Please add the token!") && two();
			} else {
				twoCode = `${input}`;
			}

			three();
		});
	}

	function three() {
		term.brightCyan(
			"\nHow much seconds you want to add the status delay?: "
		);

		term.inputField(function (error, input) {
			if (!parseInt(input)) {
				return term.red("Please add the amount of number.") && three();
			} else if (input < 15) {
				return (
					term.red(
						"\nWarning! if you add under 15 seconds you can get ban because you are spamming. Do you want to continue? [Y/N]"
					) &&
					term.yesOrNo(
						{
							yes: ["y"],
							no: ["n"],
						},
						function (error, result) {
							if (result) {
								threeCode = `${input}`;
								check();
							} else {
								return three();
							}
						}
					)
				);
			} else {
				term.brightCyan("\n");
				threeCode = `${input}`;
				check();
			}
		});
	}

	function check() {
		const ascii = require("ascii-table");
		const table = new ascii("Final");

		console.clear();

		table
			.setHeading("Numbers", "Name", "Input")
			.addRow("1", "Bot", `${oneCode}`)
			.addRow("2", "Token", `${twoCode}`)
			.addRow("3", "Status Delay", `${threeCode}`);

		term.brightCyan(`\n${table.toString()}`);
		term.brightYellow("\nAre these is right? [Y/N]");

		return term.yesOrNo(
			{
				yes: ["y"],
				no: ["n"],
			},
			function (error, result) {
				if (result) {
					return final();
				} else {
					console.clear();
					term.brightYellow('\nYou can cancel this Automatic installations by clicking Q.')
					return one();
				}
			}
		);
	}

	function final() {
		finalCode = {
			BOT: oneCode,
			TOKEN: twoCode,
			STATUS_DELAY: threeCode,
		};

		fs.renameSync("./configschema.json", "./config.json");
		fs.writeFileSync("./config.json", JSON.stringify(finalCode));
		term.brightGreen(
			"\nThe automatic installations is complete. If you want to changing your status. Go to status.json and modify for the status!"
		);
		return (
			term.brightYellow("\nPlease manually restart yout app.") &&
			process.exit()
		);
	}
};
