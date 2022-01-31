<template>
	<q-page class="flex flex-center landingtitle">
		<div class="text-h1 text-no-wrap">{{ $t("landing_wellcome") }}</div>
		<div class="row justify-center items-center q-px-xl text-no-wrap">
	        <img class="landingLogo" alt="Mindu" src="~assets/logo-mindu.svg" /><div class="col text-h1 q-pl-xl text-capitalize">{{ name }}</div>
	    </div>
	</q-page>
	<q-footer class="bkg_footer"></q-footer>
</template>

<script>
	import { defineComponent } from "vue"
	import { useQuasar } from 'quasar'
	
	export default defineComponent({
	    name: "MainLanding",
	    
	    setup() {
	        const $q = useQuasar()
		    
	        const notif = $q.notify({
	            type: 'ongoing',
	            message: 'Updating Courses...',
	            color: 'deep-orange-4',
	        })
	
	        // simulate delay
            setTimeout(() => {
                notif({
                    type: 'positive',
                    message: 'Best minds are up to date',
                    timeout: 3000
                })
            }, 2000)

			return {
				name: window.getObjectByKey("default", window.AppEtizer).toString(),
			}
		}
	});
</script>

<style scoped>
	.landingtitle {
		letter-spacing: 0.5em;
	}

	.landingLogo {
		width: 120px; 
		height: 120px;
	}

	.bkg_footer {
		height: 24vh;
		background-image: url(~assets/background_footer.svg);
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
  