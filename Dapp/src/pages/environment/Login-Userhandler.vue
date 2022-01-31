<template v-slot:user_main>
    <div class="flex flex-center q-pb-xl">
		<q-page v-if="whatImDoing == null">	
			<userActionSignIN />
	    </q-page>
	    <q-page v-else-if="whatImDoing == true">
			<userActionSignUP />
	    </q-page>
	    <q-page v-else-if="whatImDoing == false">
			<userActionRecover />
	    </q-page>
	</div>
</template>

<script>
  	import { ref } from 'vue'

	import userActionSignIN from './userhandler-components/userhandler-Action_SignIN'
	import userActionSignUP from './userhandler-components/userhandler-Action_SignUP'
	import userActionRecover from './userhandler-components/userhandler-Action_Recover'

	export default ({
		name: 'LoginUserhandler',

		components: {
			userActionSignIN,
			userActionSignUP,
			userActionRecover,
		},
		data: function () {
			return {
				whatImDoing: ref(null),
			}
		},
		methods: {
			/* controle de qual tela exbibir */
			stepChange(newStep) {
				let target = window.getVUEComponentByName(this,"LoginUserhandler")
				target.whatImDoing = newStep
			},
			
			/* regex validador de email */
			isValidEmail(regEmail) {
				const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
				return emailPattern.test(regEmail) || 'Ivalid Mail(need i18n)' //$t('login_isValidEmail')
			},	
		}
	})
</script>

<style>
	.loginCard {
		width:420px;
		height:640px;
	}
</style>
