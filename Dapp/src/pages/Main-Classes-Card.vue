<template>

	<q-card class="fit rounded arial-sm">
		<q-card-section horizontal>
            <q-img fit="none" :src="'img/' + metadataObject.media.imageURL" class="cardImg" v-if="metadataObject.media.imageURL != null"/>
            <div class="cardImg" v-else>
                <q-skeleton class="cardImg rounded-left" width="100%" square/>
            </div>
            
			<q-card-section class="cardContainer">
				<div class="projectFont text-h5 text-weight-bold text-no-wrap">
					{{ metadataObject.meta.title }}</div>
				<div class="row projectFont text-bold">
					<teacherInfo :label="$t('classes_card_withTeacher')" :teachersObject="teachersObject" :teacherID="metadataObject.meta.teacher_ID" />	
				</div>
				<div v-if="metadataObject.status > -1">
					<div>
						{{ $t("classes_card_completedDays")}}: {{ $_.random(10,10) }} {{ $t("classes_card_from") }} {{ $_.random(10,32) }}</div>
					<div class="row q-pb-sm">
						<q-linear-progress rounded size="lg" :value="$_.random(0,100)/100" color="accent" class="q-mt-sm" /></div>
					<div class="row projectFont text-bold float-right">
						{{ $_.random(5,20) }} {{ $t("classes_card_remaningDays") }}</div>							
					<div class="row projectFont text-bold q-pt-md">
						{{ $t("classes_card_youAreIn") }}:</div>
					<div class="row q-pl-lg">
						{{ $t("classes_card_classOf") }} {{ $_.random(1,50) }} {{ $t("classes_card_minutes") }}</div>
					<div class="row">
						{{ $t("classes_card_yourClassMates") }}:</div>
					<div class="row q-pl-lg">
						{{ $t("classes_card_class") }} {{ $_.random(1,25) }} - Nossas Conquista</div>	
					<div class="row justify-center items-center">
						<q-btn 
							type="button"
							rounded dense
							size="md" 
							class="text-white text-lowercase smallButton q-my-md" 
							@click="toggleDialog()"
							:label="$t('classes_card_continue')" /></div>
				</div>
				<div v-else-if="metadataObject.status < 0">
					{{ metadataObject.description }}
				</div>
			</q-card-section>	
		</q-card-section>
	</q-card>
	
</template>

<script>
	import teacherInfo from "./useradmin/useradmin-components/component-getTeacherInfo.vue"

	export default {
		name: 'MainclassesCard',

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
			/* controle de qual tela exbibir */
			toggleDialog() {	
				this.$parent["$parent"].show()
			},
		}
	}
</script>

<style scoped>
	.cardImg {
		height: 20vh; 
		min-height: 270px;
		width: 60%;
	}
	
	.cardContainer {
		width: 100%;
	}
</style>