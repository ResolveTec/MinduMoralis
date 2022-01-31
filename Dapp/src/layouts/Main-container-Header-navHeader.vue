<template>
	<q-card-section class="flex-center full-width">
        <div class="row full-width inline no-wrap justify-between items-center content-center">
            <div class="col-1">
                <q-btn flat icon="arrow_back" color="blue" size="xl" :title="$t('classes_popup_back')" v-close-popup />
            </div>
            <div class="col-auto">
                <slot name="content"></slot>
			</div>
			<div class="col-1">
				<mainHeaderLogo class="headerLogo" />
			</div>
		</div>
    </q-card-section> 
</template>

<script>
	import mainHeaderLogo from 'src/components/app-container/component__Main-Header-Logo.vue'

	export default {
		name: 'Navheader',

		components: {
			mainHeaderLogo,
		},
	}
</script>
