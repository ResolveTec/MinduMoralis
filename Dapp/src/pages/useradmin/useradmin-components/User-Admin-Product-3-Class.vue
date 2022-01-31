<template>
	<div class="mdModalSize flex full-width">
		<div class="row fit">
			<div class="col q-col-gutter-y-md">
				<div
					class="col full-width"
					v-for="classItem in classObject"
					:key="classItem.n"
				>
					<classCard type="1" :classItemObject="classItem" />
				</div>

				<div class="column justify-center items-center vertical-middle">
					<q-btn
						flat
						dense
						unelevated
						type="a"
						@click="classObjectEditModal('add')"
					>
						<div class="row">
							<q-icon
								name="add_circle_outline"
								size="2rem"
								class="floating-label"
							/>
						</div>
						<div class="row">add class</div>
					</q-btn>
				</div>
			</div>

			<q-form autocomplete="off">
				<q-dialog
					class="q-py-sm justify-center items-center full-width no-scroll rounded fit"
					v-model="classModal"
					transition-show="scale"
					transition-hide="scale"
				>
					<q-card class="classModalWidth rounded">
						<q-card-section
							class="row q-gutter-sm justify-center items-center full-width"
						>
							<div
								class="row text-h5 q-pb-sm"
								:title="'ClassID: ' + classObjectEdit.class_ID"
							>
								{{
									this.classEditedIndex == -1
										? "add class"
										: "edit class"
								}}
							</div>
							<div
								class="row no-wrap q-gutter-sm full-width q-pa-sm"
							>
								<div
									class="col-4 q-gutter-sm justify-center items-center inline-block"
								>
									<div class="row full-width">
										<q-input
											rounded
											outlined
											clearable
											ref="class"
											v-model="classObjectEdit.class_ID"
											type="number"
											class="full-width hidden"
										>
										</q-input>
										<q-input
											rounded
											outlined
											clearable
											ref="class"
											v-model="
												classObjectEdit.class_title
											"
											type="text"
											class="full-width"
											label="class title"
											maxlength="128"
											lazy-rules
											:rules="[
												(val) =>
													!!val ||
													'Título da Aula é obrigatório',
											]"
										>
											<template v-slot:append>
												<q-icon
													name="title"
													color="accent"
												/>
											</template>
										</q-input>
									</div>
									<div class="row full-width">
										<q-input
											rounded
											outlined
											clearable
											ref="class"
											v-model="classObjectEdit.class_run"
											type="number"
											class="full-width"
											label="duration time"
											maxlength="12"
										>
										</q-input>
									</div>
									<div class="row full-width">
										<q-input
											rounded
											outlined
											clearable
											ref="class"
											v-model="
												classObjectEdit.class_description
											"
											type="textarea"
											class="fit"
											label="short description"
											maxlength="4096"
											lazy-rules
											:rules="[
												(val) =>
													!!val ||
													'Short description is required',
											]"
										/>
									</div>
									<div class="row full-width">
										<!--//<q-input 
											rounded outlined clearable 
											ref="class" 
											v-model="class_video" 
											type="file"
											class="full-width"
											label="vídeo"
											maxlength="12"
										
											stack-label
											>
											<template v-slot:append>
			                                    <q-icon name="video_camera_front" color="accent" />
			                                </template>
										</q-input>//-->

										<mediaUpload
											label="class video"
											:returnUpload="uploadNow"
											:field="sendFile()"
											@loaded="loadedFile"
										/>
									</div>
									<div class="text-right">
										<q-checkbox
											ref="class"
											v-model="
												classObjectEdit.class_sample
											"
											type="checkbox"
											label="check class as free"
											size="xs"
											color="green-3"
											left-label
										/>
									</div>
									<div class="text-right">
										<q-checkbox
											ref="class"
											v-model="
												classObjectEdit.class_master
											"
											type="checkbox"
											label="check class/video as introdutory"
											size="xs"
											color="green-3"
											left-label
										/>
									</div>
								</div>
								<div class="col-auto max-height q-pt-sm">
									<q-editor
										class="fit rounded scroll overflow-auto q-pa-sm"
										ref="class"
										height="25rem"
										placeholder="Class full text"
										v-model="classObjectEdit.class_bigtext"
										:toolbar="[
											[
												{
													label: $q.lang.editor.align,
													icon: $q.iconSet.editor
														.align,
													fixedLabel: false,
													options: [
														'left',
														'center',
														'right',
														'justify',
													],
												},
											],
											[
												'bold',
												'italic',
												'strike',
												'underline',
											],
											[
												/*
									          {
									            label: $q.lang.editor.formatting,
									            icon: $q.iconSet.editor.formatting,
									            list: 'no-icons',
									            options: [
									              'p',
									              'h1',
									              'h2',
									              'h3',
									              'h4',
									              'h5',
									              'h6',
									              'code'
									            ]
									          },
									          */
												{
													label: $q.lang.editor
														.fontSize,
													icon: $q.iconSet.editor
														.fontSize,
													fixedLabel: true,
													fixedIcon: true,
													list: 'no-icons',
													options: [
														'size-1',
														'size-2',
														'size-3',
														'size-4',
														'size-5',
														'size-6',
														'size-7',
													],
												},
												/*
									          {
									            label: $q.lang.editor.defaultFont,
									            icon: $q.iconSet.editor.font,
									            fixedIcon: true,
									            list: 'no-icons',
									            options: [
									              'default_font',
									              'arial',
									              'arial_black',
									              'comic_sans',
									              'courier_new',
									              'impact',
									              'lucida_grande',
									              'times_new_roman',
									              'verdana'
									            ]
									          },
									          */
												'removeFormat',
											],
											[
												'quote',
												'unordered',
												'ordered',
												'outdent',
												'indent',
											],

											[
												'undo',
												'redo',
												'fullscreen',
												'hr',
												'link',
												'custom_btn',
											],
										]"
										:fonts="{
											arial: 'Arial',
											arial_black: 'Arial Black',
											courier_new: 'Courier New',
											impact: 'Impact',
											lucida_grande: 'Lucida Grande',
											verdana: 'Verdana',
										}"
									/>
								</div>
							</div>
						</q-card-section>

						<q-card-actions
							class="row q-py-lg q-gutter-md justify-center items-center full-width"
						>
							<div
								class="col-10 flex justify-center items-center vertical-middle q-pl-xl"
							>
								<div class="q-pl-xl">
									<q-btn
										rounded
										dense
										type="button"
										size="lg"
										class="text-white text-lowercase regularButton q-mr-sm"
										label="cancel"
										v-close-popup
									/>
									<q-btn
										rounded
										dense
										type="button"
										size="lg"
										class="text-white text-lowercase regularButton"
										@click="
											updateClass(
												classObjectEdit.class_ID
											)
										"
										:title="
											$__
												? 'Class ID: ' +
												  classObjectEdit.class_ID
												: ''
										"
										:label="
											this.classEditedIndex == -1
												? 'add'
												: 'update'
										"
										v-close-popup
									/>
								</div>
							</div>
							<div class="col-1">
								<q-btn
									flat
									dense
									:title="
										$__
											? 'Class ID: ' +
											  classObjectEdit.class_ID
											: ''
									"
									@click="
										deleteClass(classObjectEdit.class_ID)
									"
									no-caps
									><q-icon
										color="accent"
										name="delete"
										class="floating-label"
								/></q-btn>
							</div>
						</q-card-actions>
					</q-card>
				</q-dialog>
			</q-form>
		</div>
	</div>
</template>

<script>
import { ref, provide } from "vue";
import { v4 as uuid } from "uuid";

import classCard from "./User-Admin-Product-3-Class-Card.vue";
import mediaUpload from "src/components/app-container/component__Main-Uploader.vue";

const defaultObject = {
	class_ID: null,
	class_foreign_UID: 0,
	class_foreign_course_ID: 0,
	class_title: "",
	class_description_short: "",
	class_description: "",
	class_run: 0,
	class_sample: false,
	class_master: false,
	class_activities: 0,
	class_hasvideo: false,
	class_videoURL: "",
	class_bigtext: "",
};

export default {
	name: "AdminCoursesNewClass",

	components: {
		classCard,
		mediaUpload,
	},
	data() {
		provide("classObjectEditModal", this.classObjectEditModal);

		/* importa json da memoria apenas itens do usuario do curso selecionado */
		let classObject = _.filter(this.$root.$cube.value.data.classes, [
			"class_foreign_course_ID",
			this.$root.$cube.value.QUERY.courseID,
		]);

		return {
			classModal: ref(false),

			classObject,
			classObjectEdit: defaultObject,
			classStatus: null,
			classEditedIndex: -1,
			uploadNow: false,
		};
	},
	methods: {
		classObjectEditModal: function (switcher, val) {
			if (switcher == "edit") {
				this.classEditedIndex = _.findIndex(this.classObject, {
					class_ID: val,
				});
				this.classObjectEdit = _.filter(this.classObject, [
					"class_ID",
					val,
				])[0];
			} else if (switcher == "add") {
				this.classObjectEdit = JSON.parse(
					JSON.stringify(defaultObject)
				);
				this.classEditedIndex = -1;
			}
			this.classModal = true;
		},
		deleteClass(val) {
			if (confirm("Delete this Class?")) {
				this.classObject.splice([this.classEditedIndex], 1);

				let findClassRightObjectIndex = _.findIndex(
					this.$root.$cube.value.data.classes,
					["class_ID", val]
				);
				this.$root.$cube.value.data.classes.splice(
					[findClassRightObjectIndex],
					1
				);

				this.classEditedIndex = -1;
				this.classModal = false;
			}
		},
		updateClass: function () {
			let classID = this.classObjectEdit.class_ID;

			let dataObject = {
				class_ID: classID ? classID : uuid(), //_.uniqueId()
				class_foreign_UID: this.$root.$cube.value.QUERY.UID,
				class_foreign_course_ID: this.$root.$cube.value.QUERY.courseID,
				class_title: this.classObjectEdit.class_title,
				class_run: this.classObjectEdit.class_run,
				class_description: this.classObjectEdit.class_description,
				class_hasvideo: this.classObjectEdit.class_videoURL
					? true
					: false,
				class_videoURL: this.classObjectEdit.class_videoURL,
				class_sample: this.classObjectEdit.class_sample,
				class_master: this.classObjectEdit.class_master,
				class_bigtext: this.classObjectEdit.class_bigtext,
			};

			if (this.classEditedIndex > -1) {
				// update old
				Object.assign(
					dataObject,
					this.classObject[this.classEditedIndex]
				);
				Object.assign(
					dataObject,
					this.$root.$cube.value.data.classes[this.classEditedIndex]
				);
			} else {
				// add new
				// this.classObject.push(dataObject)
				this.classObject.push(dataObject);
				this.$root.$cube.value.data.classes.push(dataObject);
			}
			// garante limpeza do objeto de edição
			this.classObjectEdit = defaultObject;
			this.classEditedIndex = -1;
			this.classModal = false;
		},
		loadedFile(response) {
			console.log("teste emit");
			if (this.uploadNow == true) {
				this.classObjectEdit.class_videoURL = response.ipfsUrl; // link IPFS
				console.log(this.classObjectEdit.class_videoURL);
			} else {
				this.classObjectEdit.class_videoURL = response; /// objeto file inteiro
				console.log(this.classObjectEdit.class_videoURL);
			}
		},
		sendFile() {
			return this.classObjectEdit.class_videoURL;
		},
	},
};
</script>

<style>
.classModalWidth {
	min-width: 980px !important;
	max-width: 98% !important;
}
</style>
