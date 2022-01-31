Moralis.Cloud.define("signUpMeta", async (request) => {
	const logger = Moralis.Cloud.getLogger();
	const user = request.user;
	let params = "";
	if (request.params.email) {
		params = {
			email: request.params.email,
		};

		const validEmail = await Moralis.Cloud.run("checkEmail", params);
		if (!validEmail) {
			throw "This Email is not Valid";
		}
		user.set("username", request.params.email);
		user.set("email", request.params.email);
	}

	if (request.params.password) {
		params = {
			password: request.params.password,
		};

		const validPassword = await Moralis.Cloud.run("checkPassword", params);
		if (!validPassword) {
			throw "This Password is not Valid";
		}
		user.set("password", request.params.password);
	}
	if (request.params.name) {
		user.set("name", request.params.name);
	}
	if (request.params.lastname) {
		user.set("last_name", request.params.lastname);
	}

	await user.save(null, { useMasterKey: true }).then(
		function (response) {
			logger.info("deu certo");
			return true;
		},
		function (error) {
			logger.info("errado");
			logger.info(error);
			return error;
		}
	);
});
