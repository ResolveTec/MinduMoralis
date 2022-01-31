<template>
	<div
		class="stepperWrapper flex flex-center items-center content-center q-pa-md q-py-sm"
	>
		<div class="fit">
			<q-stepper
				flat
				dense
				class="fit rounded"
				v-model="$root.$cube.value.step"
				ref="stepper"
				color="primary"
				alternative-labels
				:header-nav="false"
				animated
				swipeable
				@transition="applyAnyKindOfFixes($root.$cube.value.step)"
			>
				<q-step
					:name="1"
					title="Course choice"
					icon="settings"
					:done="$root.$cube.value.step > 1"
				>
					<chooseCourse />
				</q-step>

				<q-step
					:name="2"
					title="Main info"
					icon="settings"
					:done="$root.$cube.value.step > 2"
				>
					<editCourse />
				</q-step>

				<q-step
					:name="3"
					title="Classes"
					icon="create_new_folder"
					:done="$root.$cube.value.step > 3"
				>
					<editClass />
				</q-step>

				<q-step
					:name="4"
					title="Extra material"
					caption="Optional"
					icon="assignment"
					:done="$root.$cube.value.step > 4"
				>
					<editExtra />
				</q-step>

				<q-step :name="5" title="Check it out" icon="add_comment">
					<div
						class="text-h5 column flex justify-center items-center vertical-middle fit"
					>
						<div v-if="!finished">
							Please, check if all the data is fine.
						</div>
						<div v-if="finished">
							<div
								class="row justify-center items-center q-my-lg"
							>
								Congratulation! This is your NFT:
							</div>
							<course-nft
								:dataText="nftData"
								@nftMinted="nftUrlIPFS"
							/>
						</div>
					</div>
				</q-step>

				<template v-slot:navigation>
					<q-stepper-navigation>
						<div v-if="!finished" class="float-right">
							<q-btn
								v-if="$root.$cube.value.step > 1"
								type="button"
								rounded
								dense
								size="lg"
								class="text-white text-lowercase regularButton q-mb-md q-mr-sm"
								@click="$refs.stepper.previous()"
								label="previous"
							/>
							<q-btn
								type="button"
								:loading="load"
								rounded
								dense
								size="lg"
								class="text-white text-lowercase regularButton q-mb-md"
								@click="
									$root.$cube.value.step == 5
										? this.finishLine()
										: $refs.stepper.next()
								"
								v-if="$root.$cube.value.step > 1"
								:label="
									$root.$cube.value.step == 5
										? 'Save and Finish'
										: 'Continue'
								"
							/>
						</div>
					</q-stepper-navigation>
				</template>
			</q-stepper>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";

import { useQuasar } from "quasar";

import chooseCourse from "./User-Admin-Product-1-Courses.vue";
import editCourse from "./User-Admin-Product-2-Course.vue";
import editClass from "./User-Admin-Product-3-Class.vue";
import editExtra from "./User-Admin-Product-4-Extras.vue";

// load all UID user data from files //
import objCourses from "src/data/samples/app_metadata.json";
import objClasses from "src/data/samples/app_classes.json";
import objTeachers from "src/data/samples/app_teachers.json";
import objTests from "src/data/samples/app_tests.json";

import courseNft from "src/pages/nfts/CourseNFT.vue";
import Web3 from "web3";
import mindu from "src/data/samples/lab_mindu.json";
import mindUniversity from "src/data/samples/lab_minduniversity.json";

const $q = useQuasar();

const UID = ref(9999); // user ID

const CUBE = ref({
	step: 1,
	QUERY: {
		UID: ref(UID.value),
		courseID: ref(0),
		classID: ref(0),
	},
	data: {},
});

var coursesObj = [],
	teachersObj = [],
	classesObj = [],
	testsObj = [];

export default {
	name: "AdminCoursesNew",

	components: {
		chooseCourse,
		editCourse,
		editClass,
		editExtra,
		courseNft,
	},
	data() {
		CUBE.value.data = {
			courses: _.filter(objCourses, ["foreign_UID", UID.value]),
			classes: _.filter(objClasses, ["class_foreign_UID", UID.value]),
			teachers: _.filter(objTeachers, ["teacher_foreign_UID", UID.value]),
			tests: _.filter(objTests, ["test_foreign_UID", UID.value]),
		};

		this.$root.$cube = CUBE;

		return {
			expanded: ["Resources"],
			cube: CUBE.value.data,
			n_files: 0,
			n_bytes: 0,
			nftNumber: 0,
			nftData: {
				courseOwner: "",
				account: "",
				courseName: "",
				courseID: "",
				description: "",
				nftDate: "",
				nftUrl: "",
			},
			finished: false,
			nftReturn: [],
			load: false,
			price: 0,
		};
	},
	methods: {
		applyAnyKindOfFixes: function (step) {
			window.scrollTo(0, 0);

			if (step == 1) {
				// seleção
				console.clear();
			} else if (step == 2) {
				// selecção->CURSOS
				console.clear();
				console.log("Curso", CUBE.value.QUERY.courseID);
				coursesObj = _.flattenDepth(
					_.filter(_.values(CUBE.value.data.courses), [
						"ID",
						CUBE.value.QUERY.courseID,
					])
				);
				console.info(
					"Curso ⬇(apenas resgate de dados)",
					_.size(coursesObj)
				);
				console.table(coursesObj);
			} else if (step == 3) {
				// cursos->CLASSES
				console.clear();
				console.info(
					"Curso Atualizado ⬇(após a atualização da página de edição do curso"
				);
				console.table(coursesObj);
			} else if (step == 4) {
				// classes->TESTES
				console.clear();
				classesObj = _.flattenDeep(
					_.filter(CUBE.value.data.classes, [
						"class_foreign_course_ID",
						CUBE.value.QUERY.courseID,
					])
				);
				console.log(
					"Aulas ⬇(após adição/edição das aulas, possuem KEYS que ligam com Cursos)",
					classesObj.length
				);
				console.table(classesObj);
			} else if (step == 5) {
				//testes->fim
				console.clear();
				let classesIDList = _.map(classesObj, "class_ID");
				testsObj = _.flattenDeep(
					_.filter(CUBE.value.data.tests, [
						"test_foreign_course_ID",
						CUBE.value.QUERY.courseID,
					])
				);
				console.log("Testes das Aulas ⬇", classesIDList);
				console.table(testsObj);
			}
		},
		finishLine: async function (val) {
			// GRAVAR
			console.clear();
			const user = this.$moralis.User.current();

			this.load = true;

			if (this.$moralis.User.current().id) {
				let bigData = coursesObj[0];
				_.assign(bigData, { __classesObject: classesObj });
				_.assign(bigData, { __testsObject: testsObj });

				console.log("BIGDATA ⬇(objetão completo)", classesObj.length);
				console.table(bigData);

				const course = coursesObj[0];
				let image = course.media.imageURL;
				let named = "";
				let first = "";
				let last = "";

				if (this.$moralis.User.current().attributes.name) {
					first = this.$moralis.User.current().attributes.name;
				}
				if (this.$moralis.User.current().attributes.last_name) {
					last = this.$moralis.User.current().attributes.last_name;
				}
				if (first || last) {
					named = first + " " + last;
				}

				const nowSeconds = new Date(Date.now());
				this.nftData.nftDate =
					"NFT minted on " + nowSeconds.toUTCString();

				this.nftData.courseOwner = named
					? named
					: "Owner of the account:";
				this.nftData.account =
					this.$moralis.User.current().attributes.ethAddress;
				this.nftData.courseName = course.meta.title;
				this.nftData.courseID = "Mundu ID: " + course.ID;

				//HARD CODE --- arrumar
				this.price = 100; // NAO ACHEI O PRECO

				console.log(image);
				const newImg = await this.saveMoralisIpfs(image);
				coursesObj[0].media.imageURL = newImg;

				console.log(coursesObj[0].media.imageURL);

				/* vamos precisar colocar aqui um loop para fazer o mesmo com os videos das aulas
                que não estão vindo */

				this.nftData.description =
					"This product contains " +
					this.formatSize(this.n_bytes) +
					" of content divided in " +
					this.n_files +
					" files";

				console.log("Logado");

				const dataObjectTable = this.$moralis.Object.extend("metadata");
				const userData = new dataObjectTable();

				const _finish = this.finish;

				userData.set("GeneralPurpose", bigData);
				userData
					.save()
					.then(
						(userData) => {
							this.$q.notify({
								type: "my-notif",
								icon: "ios_share",
								color: "yellow-10",
								spinner: true,
								message: "Please wait... Saving Data",
								timeout: 2000,
								actions: [
									{
										label: "Dismiss",
										color: "white",
										handler: () => {
											/* ... */
										},
									},
								],
							});
							console.log(
								"Dados Salvos - Objeto ID->" + userData.id
							);
							console.table(userData);
						},
						(error) => {
							this.$q.notify({
								type: "my-notif",
								icon: "warning_amber",
								message: "Error",
								color: "red-7",
								timeout: 2000,
							});
							console.log("Erro", error);
						}
					)
					.then(async function (response) {
						_finish(user.attributes.ethAddress);
					});
			} else {
				console.log("Não esta logado");
			}
		},
		async saveMoralisIpfs(newFile) {
			let bytesize = newFile.size;
			const FilesAddresses =
				this.$moralis.Object.extend("FilesAddresses");
			const filesAddresses = new FilesAddresses();

			const file = new this.$moralis.File(newFile.name, newFile);

			const ret = await file.saveIPFS();

			filesAddresses.set("hash", file.hash());
			filesAddresses.set("IPFS", file.ipfs());
			filesAddresses.set("uri", file.url());
			filesAddresses.set("userID", this.$moralis.User.current().id);
			let id = "teste";
			await filesAddresses.save();

			const json = {
				hash: ret._hash,
				ipfsUrl: ret._ipfs,
				altUrl: ret._url,
				mediaId: filesAddresses.id,
			};

			this.n_files++;
			this.n_bytes += bytesize;
			return json;
		},
		async genMetadata(number) {
			const params = {
				name: this.generateHexFileName(number),
				content: nftMeta,
			};
			console.log(await this.$moralis.Cloud.run("generate", params));
		},
		async generateNftCourse() {
			let user = this.$moralis.User.current();
			console.log("ee");
			console.log(user);

			const params = {
				address: this.$moralis.User.current().attributes.ethAddress,
				amount: this.price.toString(), //price
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

			await contract.events
				.CourseCreate()
				.on("data", (event) => {
					const courseId = event.returnValues.indexed_id;
					const owner = event.returnValues._owner;
					const price = event.returnValues._price;
					let ret = [courseId, owner, price];
					console.log(typeof ret[1] + ret[1].length + ret[1]);
					console.log(
						typeof user.attributes.ethAddress +
							user.attributes.ethAddress.length +
							user.attributes.ethAddress
					);
					this.nftReturn = ret[0];
					const urlBaseNft = "https://mincu.cc/nfts/";
					//	if (ret[1] == user.attributes.ethAddress) {  // ta dando erro sei la pq
					const jsonName = this.generateHexFileName(ret[0]);
					this.nftData.nftUrl = urlBaseNft + jsonName;
					(this.load = false), (this.finished = true);
					//	} else {
					//		console.log("erro");
					//		this.load = true;
					//	}
				})
				.on("error", () => {});
			////********* */
		},
		generateHexFileName(number) {
			let hexId = parseInt(number).toString(16);
			let paddedHex = (
				"0000000000000000000000000000000000000000000000000000000000000000" +
				hexId
			).slice(-64);
			return paddedHex + ".json";
		},
		formatSize(fsize) {
			let size = 0;
			if (fsize > 1000000) {
				size = (fsize / 1000000).toFixed(0);
				return size.toString() + " MB";
			} else if (fsize > 1000) {
				size = (fsize / 1000).toFixed(0);
				return size.toString() + " KB";
			} else {
				size = fsize.toFixed(0);
				return size.toString() + " B";
			}
		},
		nftUrlIPFS(response) {
			console.log(response);
		},
		async finish(userAddress) {
			const nftRet = await this.generateNftCourse(this.price);
		},
	},
};
</script>

<style lang="stylus">
.modalSizeDefault {
    min-height: 80px;
}

.smModalSize {
    @extend .modalSizeDefault;
    width: 100% !important;
}

.mdModalSize {
    @extend .modalSizeDefault;
    width: 100% !important;
    min-height: 320px;
}

.lgModalSize {
    @extend .modalSizeDefault;
    width: 100% !important;
    min-height: 480px;
}

.xlModalSize {
    @extend .modalSizeDefault;
    width: 100% !important;
    min-height: 840px !important;
}

.stepperWrapper {
    width: 100%;
    min-width: 640px;
    max-width: 1420px;
}
</style>
