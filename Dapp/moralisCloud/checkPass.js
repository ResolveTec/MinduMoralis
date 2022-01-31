Moralis.Cloud.define("checkPassword", async (request) => {
	const passwordPatter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
	return passwordPatter.test(request.params.password);
});
