<template>
	<div
		class="arial flex flex-center items-center content-center justify-center full-width q-pt-sm"
	>
		<div
			class="row flex flex-center items-center content-center justify-center full-width"
		>
			<q-btn
				type="button"
				rounded
				dense
				size="lg"
				class="text-white text-lowercase regularButton q-my-md"
				@click="startFreshOne()"
				label="New Course"
			/>
		</div>
		<div class="flex justify-start q-gutter-lg">
			<div v-for="oneOf in metadataObject" :key="oneOf.key">
				<div class="card" v-if="oneOf.status">
					<coursescard
						:metadataObject="oneOf"
						:teachersObject="teachersObject"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import coursescard from "./User-Admin-Product-1-Courses-Card.vue";

export default {
	name: "AdminCourses",

	components: {
		coursescard,
	},
	data() {
		return {
			/* importa json da memoria */
			metadataObject: this.$root.$cube.value.data.courses,
			teachersObject: this.$root.$cube.value.data.teachers,
		};
	},
	methods: {
		startFreshOne: function () {
			this.$root.$cube.value.QUERY.courseID = 0;
			this.$root.$cube.value.step = 2;
		},
	},
};
</script>
