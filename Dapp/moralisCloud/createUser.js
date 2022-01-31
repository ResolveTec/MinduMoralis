Moralis.Cloud.define("signNewUser", async (request) => {
	let params = {
		password: request.params.password,
	};

	const validPassword = await Moralis.Cloud.run("checkPassword", params);
	if (!validPassword) {
		throw "This Password is not Valid";
	}

	params = {
		email: request.params.email,
	};

	const validEmail = await Moralis.Cloud.run("checkEmail", params);
	if (!validEmail) {
		throw "This Email is not Valid";
	}
	const user = new Moralis.User();
	user.set("username", request.params.email);
	user.set("password", request.params.password);
	user.set("email", request.params.email);
	user.set("name", request.params.name);
	user.set("last_name", request.params.lastname);

	await user.signUp().then(
		function (response) {
			return true;
		},
		function (error) {
			return error;
		}
	);
});
