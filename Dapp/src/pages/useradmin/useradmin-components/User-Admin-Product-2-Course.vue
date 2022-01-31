<template>
	<div
		class="mdModalSize flex flex-center items-center content-center justify-center full-width"
	>
		<div class="fit">
			<div class="row q-gutter-lg">
				<div class="col q-col-gutter-y-md fit">
					<div class="row">
						<q-input
							rounded
							outlined
							clearable
							ref="course"
							v-model="courseObject.ID"
							type="text"
							class="hidden full-width"
						>
						</q-input>
						<q-input
							rounded
							outlined
							clearable
							ref="course"
							v-model="courseObject.meta.title"
							type="text"
							class="full-width"
							label="course Title"
							maxlength="128"
							lazy-rules
							:rules="[
								(val) => !!val || 'Course Title is required',
							]"
						>
							<template v-slot:append>
								<q-icon name="school" color="accent" />
							</template>
						</q-input>
					</div>
					<div class="row fit">
						<q-input
							rounded
							outlined
							clearable
							ref="course"
							v-model="courseObject.description"
							type="textarea"
							class="fit"
							label="description"
							maxlength="4096"
							lazy-rules
							:rules="[
								(val) => !!val || 'Description is required.',
							]"
						/>
					</div>
					<div class="row fit">
						<q-select
							rounded
							outlined
							clearable
							ref="course"
							v-model="courseObject.metrics.tag"
							class="full-width"
							label="TAGs"
							hint="Enter to create Tags"
							use-input
							use-chips
							multiple
							hide-dropdown-icon
							input-debounce="0"
							new-value-mode="add-unique"
						/>
					</div>
				</div>
				<div class="col q-col-gutter-y-md col-4">
					<div class="row justify-between items-center">
						<mediaUpload
							label="course cover image"
							:returnUpload="uploadNow"
							:field="sendFile()"
							@loaded="loadedFile"
						/>
					</div>
					<div class="row">
						<q-input
							rounded
							outlined
							clearable
							ref="course"
							v-model="courseObject.cart.col"
							type="text"
							class="full-width"
							label="coletion"
							maxlength="128"
						>
						</q-input>
					</div>
					<div class="row">
						<q-input
							rounded
							outlined
							clearable
							ref="course"
							v-model="courseObject.cart.value"
							class="full-width"
							label="price $"
							maxlength="18"
							prefix="Mindu"
							mask="###.###.###,##"
							:reverse-fill-mask="true"
							input-class="text-right"
							lazy-rules
							:rules="[(val) => !!val || 'Price is required.']"
						>
						</q-input>
					</div>
				</div>
			</div>
			<div class="row q-pt-lg q-gutter-lg">
				<courseTeacher :teachers="courseObject.meta.teacher_ID" />
			</div>
		</div>
	</div>
</template>

<script>
import { v4 as uuid } from "uuid";

import mediaUpload from "src/components/app-container/component__Main-Uploader.vue";
import courseTeacher from "./User-Admin-Product-2-Course-Teacher.vue";

export default {
	name: "AdminCourseNewCourse",

	components: {
		mediaUpload,
		courseTeacher,
	},
	data() {
		let metadataObject = this.$root.$cube.value.data.courses;
		if (!this.$root.$cube.value.QUERY.courseID) {
			var newKey = (this.$root.$cube.value.QUERY.courseID = uuid());
			var defaultCouse = [
				{
					ID: newKey,
					UID: this.$root.$cube.value.QUERY.UID,
					type: null,
					meta: {
						title: "",
						subtitle: null,
						teacher_ID: [],
					},
					metrics: {
						tag: [],
						progress: null,
						progress_info: null,
					},
					media: {
						imageURL: null,
						videoURL: null,
					},
					cart: {
						col: "",
						value: 0,
					},
					status: 1,
					description: "",
				},
			];
			Object.assign(metadataObject, defaultCouse);
		} else {
		}

		return {
			courseObject: _.filter(metadataObject, [
				"ID",
				this.$root.$cube.value.QUERY.courseID,
			])[0],
			uploadNow: false,
		};
	},
	methods: {
		loadedFile(response) {
			if (this.uploadNow == true) {
				this.courseObject.media.imageURL = response.ipfsUrl; // link IPFS
				// console.log(this.courseObject.media.imageURL);
			} else {
				this.courseObject.media.imageURL = response; /// objeto file inteiro
				// console.log(this.courseObject.media.imageURL);
			}
		},
		sendFile() {
			return this.courseObject.media.imageURL;
		},
	},
};
</script>
