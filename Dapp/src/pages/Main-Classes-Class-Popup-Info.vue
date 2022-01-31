<template>

	<q-card-section class="flex flex-center items-center content-center justify-center full-width q-px-xl q-py-xs">   
        <div class="middleCard q-pl-xl">
			<div class="row text-h6">
                {{ $t("classes_popup_youAreIn") }}:</div>
            <div class="row text-h6 text-weight-bold">
                {{ $t("classes_popup_class") }} {{ $_.random(5,20) }} - Trabalhar Junto</div>
            <div class="row">
                <q-linear-progress rounded size="xl" :value="$_.random(0,100)/100" color="accent" class="q-mt-sm" /></div>
            <div class="row justify-center items-center">
				<q-btn 
					type="button"
					rounded dense
					size="lg" 
					class="text-white text-lowercase regularButton q-my-md" 
					@click="altParentTab()"
					:label="$t('classes_popup_continue')" /></div>
                    <div class="row text-h6">
                        {{ $t("classes_popup_classDesc") }}:</div>
			<div class="row arial popupContentDescription">
				Equipe Sucesso é um curso focado em desenvolver suas skills de trabalho em equipe e com isso se tornar um verdadeiro team player. Além disso, você aprenderá como absorver de maneira mais eficiente tudo o que você aprende com os outros membros da sua equipe.</div>
			<div class="row justify-center items-start content-start q-pt-md">
				<div><q-icon name="menu_book" size="lg" /> {{ $_.random(1,64) }} {{ $t("classes_popup_classesRemaning") }}</div>
				<div class="q-px-lg"><q-space /></div>
				<div><q-icon name="schedule" size="lg" /> {{ $_.random(0,24) }} {{ $t("classes_popup_hoursRemaning") }}</div>
			</div>
        </div>
        <div class="middleCard q-pa-xl">
            <mainVideoPlayer src="https://ipfs.moralis.io:2053/ipfs/QmcS7vRxpydLwi3SPi7Jbdrgk57PHBrqT6eLPrVNe2WoY6" />
        </div>   
    </q-card-section>
        
    <q-card-section class="footerCard flex flex-center items-center content-center justify-around full-width q-px-xl q-py-sm">
        <div class="row text-h6 text-weight-bold">
            {{ $t("classes_popup_allClasses") }}
        </div>
        <div class="row relugarLineSize regularButton full-width text-white content-center">
            <div class="q-pl-lg">
                Primeira Semana
            </div>
        </div>
        <div class="q-px-md full-width">
            <div class="row relugarLineSize relugarLineDecoration full-width content-center q-pl-lg">
                <div class="q-pl-sm">Classe</div>
            </div>
            <div class="row relugarLineSize relugarLineDecoration full-width content-center justify-between q-pl-lg">
                <div class="q-pl-sm">Classe</div>
                <div class="float-right q-pr-md"><q-icon name="check_circle_outline" size="lg" color="accent" /></div>
            </div>
            <div class="row relugarLineSize relugarLineDecoration full-width content-center justify-between q-pl-lg">
                <div class="q-pl-sm">Classe</div>
                <div class="float-right q-pr-md"><q-icon name="arrow_forward" size="lg" /></div>
            </div>
        </div>
    </q-card-section>
    
</template>

<script>
	import mainVideoPlayer from 'src/components/app-container/component__Main-VideoPlayer.vue'
	
	export default {
		name: 'PopupInfo',

		components: {
			mainVideoPlayer,
		},
		setup() {
			return {
				rnd: window.rnd
			}
		},
		methods: {
			altParentTab() {
				this.$parent["$parent"].currentTab = 'PopupWorkingClass'
			}
		},
	}
</script>

<style scoped>
	.popupContentDescription {
		font-size: 1.2em;
	}
	
	.middleCard {
		width: 45%;
	}
	
	.footerCard {
		width: 90%!important;
	}
	
	.relugarLineSize {
		min-height: 58px;
	}
	.relugarLineDecoration {
		border-bottom: 1px solid #acacac;
	}
</style>
