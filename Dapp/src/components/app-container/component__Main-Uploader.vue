<template>
	<div class="uploader">
		<div>
			<q-file
				:model-value="files"
				@update:model-value="updateFiles"
				standout="bg-primary text-white"
				rounded
				filled
				label-color="black"
				style="max-width: 100%"
				:label="label"
				bg-color="accent"
			>
				<template v-if="!canUpload" v-slot:append>
					<q-icon
						name="add"
						@click.stop="model = null"
						v-if="!canUpload"
						class="cursor-pointer"
						color="black"
					></q-icon>
				</template>
				<template v-else v-slot:append>
					<q-btn
						v-if="uploadable == 'to' && returnUpload"
						round
						unelevated
						color="accent"
						:loading="load"
						icon="cloud_upload"
						@click="upload"
					/>
					<q-btn
						v-if="uploadable == 'done'"
						round
						unelevated
						color="accent"
						:loading="load"
						icon="done"
						@click="upload"
					/>
					<q-btn
						v-if="uploadable == 'del'"
						round
						unelevated
						color="accent"
						:loading="load"
						icon="delete"
						@click="upload"
					/>
				</template>
			</q-file>
		</div>
		<div class="content row justify-around content-center">
			<div
				v-if="!errorCheck()"
				class="row justify-center items-center content-center"
			>
				<div class="col-1 justify-center items-center content-center">
					{{ formatSize() }}
				</div>

				<div
					v-if="canUpload"
					class="column col-10 justify-center items-center content-center"
				>
					<div
						v-if="files.name && files.type.indexOf('image/') === 0"
					>
						<img class="wd" :src="onFileInput()" />
					</div>
					<div
						v-if="files.name && files.type.indexOf('video/') === 0"
					>
						<q-icon
							tag="div"
							size="2.5rem"
							name="movie"
							color="grey"
						></q-icon>
					</div>
					<div
						v-if="
							!files.name ||
							(files.type.indexOf('video/') !== 0 &&
								files.type.indexOf('image/') !== 0)
						"
					>
						<q-icon
							tag="div"
							size="2.5rem"
							name="file_present"
							color="grey"
						></q-icon>
					</div>
				</div>
				<div
					v-if="canUpload"
					class="col-1 justify-center items-center content-center"
				>
					<q-icon
						tag="div"
						size="1.5rem"
						name="delete"
						color="grey"
						@click="this.files = null"
					></q-icon>
				</div>
			</div>
			<div
				v-if="errorCheck()"
				class="row justify-center items-center content-center q-pt-md"
			>
				<div class="col-12 errorMsg">
					{{ errorCheck() }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed, onBeforeUnmount } from "vue";
export default {
	name: "MainUploader",
	setup() {
		const files = ref(null);

		const uploading = ref(null);

		function cleanUp() {
			clearTimeout(uploading.value);
		}

		onBeforeUnmount(cleanUp);

		return {
			files,

			uploading,

			canUpload: computed(() => files.value !== null),

			updateFiles(newFiles) {
				files.value = newFiles;
			},
		};
	},
	watch: {
		files: function (val) {
			this.sendFile();
		},
	},
	data() {
		return {
			my_photo: "",
			load: false,
			errorMsg: false,
			uploadable: "to",
		};
	},
	props: {
		multiple: {
			type: Boolean,
			required: true,
			default: false,
		},
		label: {
			type: String,
			required: false,
			default: "Uploader",
		},
		returnUpload: {
			type: Boolean,
			required: false,
			default: false,
		},
		field: File,
	},
	methods: {
		deleteCourseFile(scope, file) {
			console.log(file);
			scope.removeFile(file);
			// fire event here
		},
		ipfs() {
			console.log(file);
		},
		async upload() {
			try {
				if (this.uploadable == "to") {
					//	console.log(this.files);
					this.load = true;
					const file = new this.$moralis.File(
						this.files.name,
						this.files
					);

					console.log(file);
					const FilesAddresses =
						this.$moralis.Object.extend("FilesAddresses");
					const filesAddresses = new FilesAddresses();

					const ret = await file.saveIPFS();

					filesAddresses.set("hash", file.hash());
					filesAddresses.set("IPFS", file.ipfs());
					filesAddresses.set("uri", file.url());
					filesAddresses.set(
						"userID",
						this.$moralis.User.current().id
					);
					console.log("aqui");

					let id = "teste";
					await filesAddresses.save();

					console.log(filesAddresses.id);

					let json = "";

					if (this.returnUpload == true) {
						json = {
							hash: ret._hash,
							ipfsUrl: ret._ipfs,
							altUrl: ret._url,
							mediaId: filesAddresses.id,
						};
						console.log("aqui");
					} else {
						json = this.files;
						console.log("acola");
						console.log(this.files);
						console.log(json);
					}

					this.$emit("loaded", json);
					this.load = false;
					this.uploadable = "done";
				} else {
					this.files = null;
					this.uploadable = "to";
				}
			} catch (error) {
				this.uploadable = "to";
				this.load = false;

				alert(error);
			}
		},
		onFileInput() {
			const data = URL.createObjectURL(this.files);
			return data;
		},
		formatSize() {
			let size = 0;
			if (this.files && this.files.name) {
				if (this.files.size > 1000000) {
					size = (this.files.size / 1000000).toFixed(2);
					return size.toString() + " MB";
				} else if (this.files.size > 1000) {
					size = (this.files.size / 1000).toFixed(2);
					return size.toString() + " KB";
				} else {
					size = this.files.size.toFixed(2);
					return size.toString() + " B";
				}
			}
			return null;
		},
		errorCheck() {
			if (this.files) {
				if (this.files.size > 150000000) {
					this.uploadable = "del";
					return "File size can not be bigger than 150MB";
				}
			}
			return false;
		},
		sendFile() {
			//console.log(this.files);
			if (!this.returnUpload) {
				this.$emit("loaded", this.files);
			}
		},
	},
	beforeCreate() {
		console.log("aquidasd");
		console.log(this.field);

		if (this.field) {
			this.files = this.field;
		}
	},
};
</script>

<style scoped>
.botao {
	background-color: blue;
}

.wid {
	width: 100%;
}
.uploader {
	min-height: 146px;
	width: 100%;
	border-radius: 30px;
	border: 1px solid #cccccc;
}

.wd {
	width: 100px;
	height: 50px;
}

.errorMsg {
	color: red;
}
</style>
