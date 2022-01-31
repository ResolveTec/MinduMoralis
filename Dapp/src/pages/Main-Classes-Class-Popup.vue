<template>
	<q-card class="popupContent flex flex-center items-center content-center q-pa-md q-py-sm">
        
        <navheader>
            <template v-slot:content>
	            <div class="row justify-center items-start content-start">
	                <div class="inline-block q-pt-lg">
	                    <div class="row projectFont text-h3 text-weight-bold q-pr-xs">
							Title</div>
						<div class="row projectFont text-h5 text-bold float-right q-pr-sm">
							Class<!-- <teacherInfo :label="$t('classes_card_withTeacher')" :teacherID="classObject.meta.teacher_ID" />	 -->
						</div>
					</div>
					<div class="inline-block">
						<q-img :src="'img/arte1.png'" class="cardImg rounded" /></div>
				</div>
			</template>
		</navheader>
        
		<component v-bind:is="currentTabComponent"></component>
			
    </q-card>
</template>

<script>
	import teacherInfo from "./useradmin/useradmin-components/component-getTeacherInfo.vue"
	
	import navheader from 'src/layouts/Main-container-Header-navHeader.vue'
	
	import tab_PopupInfo from './Main-Classes-Class-Popup-Info.vue'
	import tab_PopupWorkingClass from './Main-Classes-Class-Popup-WorkingClass.vue'
	
	export default {
		name: 'PopupClass',

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
		components: {
			teacherInfo,
			navheader,
			
			tab_PopupInfo,
			tab_PopupWorkingClass,
		},
		data() {
			return {
				currentTab: "PopupInfo",
			}
		},
		computed: {
            currentTabComponent: function() {
                return "tab_" + this.currentTab;
            }
        }
	}
</script>

<style scoped>
	.cardImg {
		max-height: 120px;
		width: 190px;
	}
	
	.popupContent {
		width: 100%;
		min-width: 640px;
		max-width: 1420px;
	}
</style>
