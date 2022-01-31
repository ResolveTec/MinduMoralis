import Moralis from "moralis";

export default async ({ app }) => {
	// something to do

	app.config.globalProperties.$moralis = Moralis;

	await Moralis.start({
		/* data @ .env file */
		serverUrl: process.env.SERVER_URL,
		appId: process.env.APP_ID,
	});
};
