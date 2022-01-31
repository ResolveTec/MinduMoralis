Moralis.Cloud.define("generate", async (request) => {
	const logger = Moralis.Cloud.getLogger();
	Moralis.Cloud.httpRequest({
		method: "POST",
		url: "https://mindu.cc/services/grava_nft.php",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},

		body: {
			token: "JVFBa4w5vZP9bkamw9sgFM5zX9glcq0SEm4SanZB0Q3T5Dlb",
			name: request.params.name,
			content: request.params.content,
		},
	}).then(
		function (response) {},
		function (httpResponse) {
			logger.info(
				"Request failed with response code " + httpResponse.data
			);
		}
	);
});
