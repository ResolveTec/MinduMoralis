<template>

	<q-page class="q-pb-xl">
		<div class="full-width row q-pt-sm">
			<div class="full-width text-h5 text-weight-bold">{{ $t("classes_myCourses")}}</div>
			<div class="flex justify-start q-gutter-lg">
				<div v-for="oneOf in metadataObject" :key="oneOf.key">
					<div class="card" v-if="oneOf.status > -1">
						<card :metadataObject="oneOf" :teachersObject="teachersObject" />
					</div>
				</div>
			</div>
		</div>
		
		<div class="full-width row q-pt-lg">
			<div class="full-width text-h5 text-weight-bold">{{ $t("classes_otherAvaiableCourses")}}</div>
			<div class="flex justify-start">
				<div v-for="oneOf in metadataObject" :key="oneOf.key">
					<div class="card" v-if="oneOf.status < 0">
						<card :metadataObject="oneOf" :teachersObject="teachersObject" />
					</div>
				</div>
			</div>
		</div>
	</q-page>
	
	<q-dialog ref="dialogRef" v-model="popupClass" transition-show="scale" transition-hide="scale">
        <popup :metadataObject="metadataObject" :teachersObject="teachersObject"/>
    </q-dialog>
    
</template>

<script>
	import classes from "src/data/samples/app_metadata.json"
	import teachers from "src/data/samples/app_teachers.json"
	
	import card from "./Main-Classes-Card.vue"
	import popup from "./Main-Classes-Class-Popup.vue"
	
	import { useQuasar } from 'quasar'
	import { ref } from 'vue'
	
	import { useDialogPluginComponent } from 'quasar'

	export default {
		name: 'Mainclasses',
		
		components: {
			card,
			popup,
		},
		setup() {
			const $q = useQuasar()
			//console.log(this.$q)
			
			const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
			
	        return {
	            popupClass: ref(false),   
	            dialogRef,
                onDialogHide,
                onOKClick () {
			        onDialogOK()
			    },
			    onCancelClick: onDialogCancel
	        }
	    },		
		data() {			
	        return {
	            /* importa json de arquivos */
	            metadataObject: classes,
	            teachersObject: teachers,
	        }
	    },
	}
</script>

<style scoped>
	.card {
		height: 20vh;
		min-height: 270px;
		width: 520px;
	}
</style>