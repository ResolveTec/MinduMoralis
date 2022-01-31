Moralis.Cloud.define("generateCourseNFT", async (request) => {
	const web3 = Moralis.web3ByChain("0xa869"); //avax testnet
	const config = await Moralis.Config.get({
		useMasterKey: true,
	});
	const logger = Moralis.Cloud.getLogger();
	const cAddress = config.get("MINDUNIVERSITY_ADDRESS", {
		useMasterKey: true,
	});

	const ABI = config.get("MINDUNIVERSITY_ABI", {
		useMasterKey: true,
	}).abi;
	logger.info(
		config.get("MINDUNIVERSITY_ABI", {
			useMasterKey: true,
		})
	);
	const contract = new web3.eth.Contract(ABI, cAddress);
	let price = web3.utils.toWei(request.params.amount, "ether");
	const tx = {
		// this could be provider.addresses[0] if it exists
		from: config.get("MINDU_OWNER", {
			useMasterKey: true,
		}),
		// target address, this could be a smart contract address
		to: cAddress,
		// optional if you want to specify the gas limit
		gas: 2000000,
		// optional if you are invoking say a payable function
		//value: value,
		// this encodes the ABI of the method and the arguements

		data: contract.methods
			.mint(request.params.address, price, request.params.fee)
			.encodeABI(),
	};

	const aut = config.get("MINDU_AUTH", {
		useMasterKey: true,
	});
	const signPromise = web3.eth.accounts.signTransaction(tx, aut);
	//  let account = await web3.eth.accounts.privateKeyToAccount('0x'+privateKey);
	//privateKey is the key that you get from Ganache client
	signPromise
		.then((signedTx) => {
			// raw transaction string may be available in .raw or
			// .rawTransaction depending on which signTransaction
			// function was called
			const sentTx = web3.eth.sendSignedTransaction(
				signedTx.raw || signedTx.rawTransaction
			);
			sentTx.on("receipt", (receipt) => {
				logger.info(JSON.stringify(receipt));
			});
			sentTx.on("error", (err) => {
				// do something on transaction error
				logger.info(JSON.stringify(err));
			});
		})
		.catch((err) => {
			// do something when promise fails
			logger.info(JSON.stringify(err));
		});
});
