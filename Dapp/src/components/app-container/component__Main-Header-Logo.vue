<template>
	<q-btn flat class="q-pa-none no-hover" to="/">
		<img src="~assets/logo-mindu.svg" class="headerLogo" :title="title + ' Home'"/>
	</q-btn>
</template>

<script>
	export default {
		name: 'LogoComponent',

		props: {
			title: {
				type: String,
				required: false,
			},
		}
	}
</script>

<style scoped>
	.headerLogo {
		max-height: 9vh;
        max-width: 9vh;
	}

</style>