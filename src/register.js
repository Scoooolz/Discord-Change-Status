module.exports = () => {
	const fs = require('fs')
	const term = require("terminal-kit").terminal;
	const child = require('child_process');

	term.brightYellow(
		"First installations detected. Loading automatic installations. You can cancel this Automatic installations by clicking Q."
	);

	term.on('key', function(name, matches, data) {
		if(name === 'q') {
			return term.brightBlue('\n\nSee ya!') && process.exit()
		}
	})

	let oneCode = "";
	let twoCode = "";
	let threeCode = "";
	let statusCode = "";
	let finalCode = "";

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
							term.cyan("Now you are using bot.");
							oneCode = "true";
							two();
						}
					}
				);
			}
		}
	);

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
								final();
							} else {
								return three();
							}
						}
					)
				);
			} else {
				threeCode = `${input}`;
				final();
			}
		});
	}

	function final() {
		finalCode = {
			BOT: oneCode, 
			TOKEN: twoCode, 
			STATUS_DELAY: threeCode, 
		};

		fs.renameSync("./configschema.json", "./config.json");
		fs.writeFileSync("./config.json", JSON.stringify(finalCode));
		term.brightGreen("The automatic installations is complete. If you want to changing your status. Go to status.json and modify for the status!");
		return term.brightYellow("Trying to restart app.") && child.execSync('node .')
	}
};
