<template>
	<q-page class="wrapper q-px-md q-pb-xl">
		<div class="full-width row q-pt-sm">
			<div
				class="full-width row inline no-wrap justify-center items-center content-center arial"
			>
				<div class="col-2">
					<input type="text" v-model="usuario" />
				</div>
				<div class="col-2">
					<input type="password" v-model="password" />
				</div>
				<button @click="login">Login Email</button>

				<button @click="metamask">Conecta Metamask</button>
				<button @click="getUser">Get User</button>
				<button @click="logout">Logout</button>
				<button @click="link">Link</button>
			</div>

			<div
				class="full-width row inline no-wrap justify-center items-center content-center arial"
			>
				<div class="col-2">Teste upload</div>
				<div class="col-2">
					<input type="file" name="file" id="file" />
					<button @click="upload">Upload</button>
				</div>
			</div>
			<div
				class="full-width row inline no-wrap justify-center items-center content-center arial"
			>
				<div class="col-2">Add Icon</div>
				<div class="col-2">
					<button @click="addTokenImage">
						Add Mindu Logo to Metamask
					</button>
				</div>
			</div>
			<div
				class="full-width row inline no-wrap justify-center items-center content-center arial"
			>
				<div class="col-2">Hex</div>
				<div class="col-2">
					<input type="text" v-model="id" />
				</div>
				<div class="col-2">
					<input type="text" v-model="hex" />
				</div>
				<div class="col-2">
					<button @click="generateHexFileName(id)">Hex</button>
					<button @click="revertHex(hex)">Revert</button>
					<button @click="setUrl()">Set Url</button>
					<button @click="checkemail()">check email</button>
					<button @click="checkPass()">check pass</button>
				</div>
			</div>
			<div
				class="full-width row inline no-wrap justify-center items-center content-center arial"
			>
				<div class="col-2">Cloud Functions</div>
			</div>
			<div
				class="full-width row inline no-wrap justify-center items-center content-center arial"
			>
				<div class="col-2">
					<button @click="sendMindu()">Send Me 100 Mindus</button>
				</div>
				<div class="col-2">
					<button @click="genMetadata(1)">Generate Metadata</button>
				</div>
				<div class="col-2">
					<q-btn :loading="load" @click="generateNftCourse()"
						>Generate NFT</q-btn
					>
				</div>
				<div class="col-2">
					<button @click="buyCourse(11, '100')">Buy Course</button>
				</div>
				<div class="col-2">
					<button @click="claimCertificate(11, 12)">
						Claim Certificate
					</button>
				</div>
			</div>

			<div
				class="full-width row inline no-wrap justify-center items-center content-center arial"
			>
				<div class="col-2">
					<q-btn @click="eventQuery()">Event</q-btn>
				</div>
			</div>
			<div
				class="full-width row justify-start items-center content-center arial"
			>
				<div class="col-2">
					<media-upload @uploaded="uploadReturn" />
				</div>
			</div>
		</div>
	</q-page>
</template>
<script>
import Web3 from "web3";
import mindu from "src/data/samples/lab_mindu.json";
import mindUniversity from "src/data/samples/lab_minduniversity.json";

import mediaUpload from "src/components/app-container/component__Main-Uploader.vue";

export default {
	name: "teste",
	components: {
		mediaUpload,
	},
	data() {
		return {
			user: "tste",
			usuario: "",
			password: "",
			id: 0,
			hex: 0,
			mindu_amount: 0,
			mindu_address: "",
			load: false,
		};
	},
	methods: {
		async metamask() {
			this.user = await this.$moralis

				.authenticate({
					signingMessage: "Mindu Authentication",
				})
				.then(function (user) {
					return user;
				});
		},
		getUser() {
			console.log(this.user);
			console.log(this.$moralis.User.current());
			if (this.$moralis.User.current()) {
				console.log(
					"Usuário Logado" +
						this.$moralis.User.current().attributes.ethAddress
				);
			} else {
				console.log("Usuário não logado");
			}
		},
		async login() {
			await this.$moralis.User.logIn(this.usuario, this.password);
		},
		async logout() {
			await this.$moralis.User.logOut();
		},
		async link() {
			this.$moralis.onAccountsChanged(async (accounts) => {
				const confirmed = confirm("Link this address to your account?");
				if (confirmed) {
					console.log(accounts);
					await this.$moralis.link(accounts[0]); //Não faz a união se a carteira já tiver sido transformada em outro User no banco. Pensar a lógica de implementação antes de continuar.
				}
			});
		},
		async upload() {
			const file_input = document.getElementById("file");
			const filename = file_input.files[0].name;
			const filesize = file_input.files[0].size;
			const limitsize = 150000000;
			const FilesAddresses =
				this.$moralis.Object.extend("FilesAddresses");
			const filesAddresses = new FilesAddresses();
			const file = new this.$moralis.File(filename, file_input.files[0]);

			console.log(file);

			if (filesize > limitsize) {
				console.log("Arquivo muito grande");
				await file.save();
			} else {
				await file.saveIPFS();
			}

			filesAddresses.set("hash", file.hash());
			filesAddresses.set("IPFS", file.ipfs());
			filesAddresses.set("uri", file.url());
			filesAddresses.set("userID", this.$moralis.User.current().id);

			filesAddresses.save();

			console.log(filename + filesize);

			console.log(file);
		},
		async addTokenImage() {
			const tokenAddress = "0x" + process.env.MINDU_COIN;
			const tokenSymbol = "MINDU";
			const tokenDecimals = 18;
			const tokenImage =
				"https://ipfs.moralis.io:2053/ipfs/QmW8Pe22ABarvfSCVC2BZo9LTpjzSDochSVAeLmsd7LzFH";

			try {
				// wasAdded is a boolean. Like any RPC method, an error may be thrown.
				const wasAdded = await ethereum.request({
					method: "wallet_watchAsset",
					params: {
						type: "ERC20", // Initially only supports ERC20, but eventually more!
						options: {
							address: tokenAddress, // The address that the token is at.
							symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
							decimals: tokenDecimals, // The number of decimals in the token
							image: tokenImage, // A string url of the token logo
						},
					},
				});

				if (wasAdded) {
					console.log("Thanks for your interest!");
				} else {
					console.log("Your loss!");
				}
			} catch (error) {
				console.log(error);
			}
		},
		generateHexFileName(number) {
			let hexId = parseInt(number).toString(16);
			let paddedHex = (
				"0000000000000000000000000000000000000000000000000000000000000000" +
				hexId
			).slice(-64);
			return paddedHex + ".json";
		},
		revertHex(paddedHex) {
			console.log(Date.now());

			var d = new Date(Date.now());

			console.log(d.toUTCString());
			let id = parseInt(paddedHex, 16);
			return id;
		},
		generateBase64() {
			console.log(nftMeta);
			let base64 = nftMeta.toString("base64");
			this.base64 = base64;
			return base64;
		},
		async sendMindu() {
			const params = {
				address: this.$moralis.User.current().attributes.ethAddress,
				amount: "100",
			};

			console.log(await this.$moralis.Cloud.run("sendMindu", params));
		},

		async genMetadata(number) {
			const params = {
				name: this.generateHexFileName(number),
				content: nftMeta,
			};
			console.log(await this.$moralis.Cloud.run("generate", params));
		},
		async generateNftCourse() {
			const params = {
				address: this.$moralis.User.current().attributes.ethAddress,
				amount: "100", //price
				fee: 10,
			};
			this.load = true;

			console.log(this.load);
			await this.$moralis.Cloud.run("generateCourseNFT", params);

			//********** */
			const CONTRACT_ADDRESS = "0x" + process.env.MIND_UNIVERSITY;
			const CONTRACT_ABI = mindUniversity.abi;
			const web3Provider = await this.$moralis.enableWeb3();
			const web3 = new Web3(this.$moralis.provider);
			const contract = new web3.eth.Contract(
				CONTRACT_ABI,
				CONTRACT_ADDRESS
			);

			const options = {
				contractAddress: CONTRACT_ADDRESS,
				functionName: "number",
				abi: CONTRACT_ABI,
			};
			const hexNumber = await this.$moralis.executeFunction(options);
			const number = this.revertHex(hexNumber._hex);
			let ret = "";
			/*    Code to query events here       */
			await contract.events
				.CourseCreate()
				.on("data", (event) => {
					const courseId = event.returnValues.indexed_id;
					const owner = event.returnValues._owner;
					const price = event.returnValues._price;
					ret = [courseId, owner, price];
					console.log(event);
					this.load = false;
					console.log(ret);
				})
				.on("error", () => {
					ret = false;
					this.load = false;
					console.log(ret);
				});
			////********* */
		},
		async checkemail() {
			const params = {
				email: "matheus@infolog.email",
			};

			console.log(await this.$moralis.Cloud.run("checkEmail", params));
		},
		async checkPass() {
			const params = {
				password: "123456As",
			};

			console.log(await this.$moralis.Cloud.run("checkPassword", params));
		},
		async buyCourse(courseId, price) {
			const cAddress = "0xa199a2D6DF4CCE03a2f8dcC353d131af4b55b802";
			const ABI = mindUniversity.abi;
			const web3 = await this.$moralis.enableWeb3();

			const options = {
				contractAddress: cAddress,
				functionName: "register",
				abi: ABI,
				params: {
					id_course: courseId,
					amount: this.$moralis.Units.Token(price, "18"),
				},
			};
			console.log(await this.$moralis.executeFunction(options));
		},
		async setUrl() {
			const web3 = await this.$moralis.enableWeb3();
			const cAddress = "0xa199a2D6DF4CCE03a2f8dcC353d131af4b55b802";
			const ABI = mindUniversity.abi;
			const url = "https://mindu.cc/nfts/{id}.json";

			const options = {
				contractAddress: cAddress,
				functionName: "setURI",
				abi: ABI,
				params: {
					newuri: url,
				},
			};
			console.log(await this.$moralis.executeFunction(options));
		},

		async claimCertificate(course_id, registration_id) {
			const params = {
				address: this.$moralis.User.current().attributes.ethAddress,
				courseId: course_id, // id do curso no SmartContract
				registrationId: registration_id, // id da matricula do curso no Smart Contract
			};

			console.log(
				await this.$moralis.Cloud.run("claimCertificate", params)
			);
		},
		async eventQuery() {
			const CONTRACT_ADDRESS = "0x" + process.env.MIND_UNIVERSITY;
			const CONTRACT_ABI = mindUniversity.abi;
			const web3Provider = await this.$moralis.enableWeb3();
			const web3 = new Web3(this.$moralis.provider);
			const contract = new web3.eth.Contract(
				CONTRACT_ABI,
				CONTRACT_ADDRESS
			);

			const options = {
				contractAddress: CONTRACT_ADDRESS,
				functionName: "number",
				abi: CONTRACT_ABI,
			};
			const hexNumber = await this.$moralis.executeFunction(options);
			const number = this.revertHex(hexNumber._hex);

			/*    Code to query events here       */
			contract.events
				.CourseCreate()
				.on("data", (event) => {
					const courseId = event.returnValues.indexed_id;
					const owner = event.returnValues._owner;
					const price = event.returnValues._price;
					return [courseId, owner, price];
				})
				.on("error", () => {
					return false;
				});
		},
		uploadReturn(json) {
			console.log(json);
		},
	},
};
</script>
<style scoped>
.row {
	height: 50px;
}
</style>
