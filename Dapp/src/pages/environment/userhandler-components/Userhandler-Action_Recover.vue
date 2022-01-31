<template>
	<div class="column q-pa-lg">
		<div class="row loginCard">
			<q-card
				:flat="true"
				class="full-width justify-center items-center transpBackground"
			>
				<q-card-section class="q-pb-sm">
					<div class="column">
						<div class="col self-center q-pb-lg">
							<img
								src="~assets/logo-mindu.svg"
								width="144"
								height="144"
							/>
						</div>
						<div>
							{{ $t("login_recoverIKnowMyAccount") }}
							<q-btn
								flat
								class="q-pa-none no-hover text-accent"
								:label="$t('login_recoverComeback')"
								@click="stepChange(null)"
								no-caps
							/>
						</div>
					</div>
				</q-card-section>

				<q-form>
					<div class="justify-center items-center">
						<q-input
							rounded
							outlined
							ref="user_email"
							v-model="email"
							standout="text-black bg-grey-2"
							type="email"
							:label="$t('login_accessMailTitle')"
							lazy-rules
							:rules="[
								(val) => !!val || $t('login_accessMail'),
								isValidEmail,
							]"
						>
						</q-input>

						<div
							class="row text-grey-8 text-weight-thin text-center"
						>
							<q-card-actions
								class="q-px-lg full-width justify-center items-center"
							>
								<q-btn
									rounded
									size="lg"
									class="text-white text-lowercase regularButton"
									padding="sm lg"
									:label="$t('login_recoverFromEmail')"
									@click="onSubmit"
								/>
							</q-card-actions>
						</div>
					</div>
				</q-form>
			</q-card>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import sharedFunc from "src/pages/environment/Login-Userhandler";

export default {
	name: "UserActionRecover",

	setup() {
		return {
			isPwd: ref(true),
		};
	},
	data() {
		return {
			email: null,
		};
	},
	methods: {
		/* envia e-mail para resgate do acesso (para desenvolvimento)*/
		onSubmit() {
			console.log("to qaq");
			this.$moralis.User.requestPasswordReset(this.email);
		},
	},
	created() {
		this.stepChange = sharedFunc.methods.stepChange;
		this.isValidEmail = sharedFunc.methods.isValidEmail;
		this.isValidEmail.bind(this);
	},
};
</script>
