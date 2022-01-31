<template>
	<div class="videoWrapper column rounded fit">
		<transition
	            appear
	            enter-active-class="animated fadeIn"
	            leave-active-class="animated fadeOut">
		        <q-video
                    allowfullscreen
					type="video"
					frameborder="0"
					:ratio="16/9"
					:cross-origin="'anonymous'"
					:autoplay="true"
					:show-big-play-button="true"
					src="https://ipfs.moralis.io:2053/ipfs/QmcS7vRxpydLwi3SPi7Jbdrgk57PHBrqT6eLPrVNe2WoY6"/>
		</transition>
		<q-inner-loading >
	        <q-circular-progress
		        indeterminate
		        size="75px"
		        :thickness="0.6"
		        color="lime"
		        center-color="grey-8"
		        class="q-ma-md"
		    />
	    </q-inner-loading>
	</div>
</template>

<script>
	export default {
		name: 'VideoPlayer',
	}
</script>

<style scoped>
	.videoWrapper {
		width: 95%;
		height: 95%;
		background-color: #000000;
	}
</style>