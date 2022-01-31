<template>
	<q-card class="fit rounded arial-sm">
		<q-card-section class="fit" horizontal>
			<q-img
				fit="none"
				:src="'img/' + metadataObject.media.imageURL"
				class="cardImg"
				v-if="metadataObject.media.imageURL != null"
			/>
			<div class="cardImg" v-else>
				<q-skeleton class="cardImg rounded-left" width="100%" square />
			</div>

			<q-card-section class="cardContainer row full-width">
				<div class="cardContainerRow row inline-block">
					<div
						class="text-h5 text-weight-bold text-no-wrap inline-block q-pr-sm"
					>
						{{ metadataObject.meta.title }}
						{{ $__ ? "Course ID: " + metadataObject.ID : "" }}
					</div>
					<div class="row text-bold inline-block">
						<teacherInfo
							:label="$t('classes_card_withTeacher')"
							:teachersObject="teachersObject"
							:teacherID="metadataObject.meta.teacher_ID"
						/>
					</div>
					<div class="q-pt-sm full-heigth">
						{{ metadataObject.description }}
					</div>
				</div>
				<div class="row full-width">
					<div class="col-8 q-pt-xs">
						<div class="column text-weight-bold">
							Registered Students: {{ $_.random(1, 300) }}
						</div>
						<div class="column inline-block text-weight-bold">
							Students who have finished: {{ $_.random(1, 300) }}
						</div>
					</div>
					<div class="col-4">
						<div class="align-right float-right justify-right">
							<q-btn
								type="button"
								flat
								dense
								size="lg"
								color="accent"
								class="text-green-3"
								icon-right="edit_note"
								@click="chooseThisOne(metadataObject.ID)"
								:title="
									$__ ? 'Course ID: ' + metadataObject.ID : ''
								"
							>
								<div
									class="font-h5 text-lowercase inline-block text-weight-bold"
								>
									{{
										!metadataObject.media.imageURL
											? "Continue"
											: "Edit"
									}}
								</div>
							</q-btn>
						</div>
					</div>
				</div>
			</q-card-section>
		</q-card-section>
	</q-card>
</template>

<script>
import teacherInfo from "./component-getTeacherInfo.vue";

export default {
	name: "AdminCoursesCard",

	components: {
		teacherInfo,
	},
	props: {
		metadataObject: {
			type: Object,
			required: true,
		},
		teachersObject: {
			type: Object,
			required: true,
		},
	},
	methods: {
		chooseThisOne: function (val) {
			this.$root.$cube.value.QUERY.courseID = val;

			/* nav adjusts - force next step & top screen */
			this.$root.$cube.value.step = 2;
			window.scrollTo(0, 0);
		},
	},
};
</script>

<style scoped>
.cardImg {
	height: 20vh;
	min-height: 270px;
	width: 60%;
	max-width: 220px;
}

.cardContainer {
	width: 100% !important;
	max-height: 100px;
}

.cardContainerRow {
	height: 180px !important;
}
</style>
