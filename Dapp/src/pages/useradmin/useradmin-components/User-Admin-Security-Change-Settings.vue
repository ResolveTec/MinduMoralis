<template>
	<q-card
		:flat="true"
		class="rounded full-width justify-center items-center"
		v-if="confirm == true"
	>
		<q-card-section class="q-pb-sm">
			{{ $t("security_message") }}</q-card-section
		>
	</q-card>

	<q-card v-else :flat="true" class="rounded full-width justify-center items-center">
		<q-card-section class="q-pb-sm">
			<div class="column">
				<div class="col self-center q-pb-lg">
					<img
						src="~assets/logo-mindu.svg"
						width="144"
						height="144"
					/>
				</div>
			</div>
		</q-card-section>

		<q-form>
			<div class="justify-center items-center q-pa-lg">
				<div class="row">
					<div class="col q-pr-xs">
						<q-input
							rounded
							outlined
							ref="user_name"
							v-model="username"
							standout="text-black bg-grey-2"
							type="text"
							:label="$t('login_adduserNameTitle')"
							:rules="[
								(val) =>
									(val && val.length > 0) ||
									$t('login_adduserName'),
							]"
						>
						</q-input>
					</div>
					<div class="col q-pl-xs">
						<q-input
							class="self-center"
							rounded
							outlined
							ref="user_surname"
							v-model="usersurname"
							standout="text-black bg-grey-2"
							type="text"
							:label="$t('login_adduserSurnameTitle')"
							:rules="[
								(val) =>
									(val && val.length > 0) ||
									$t('login_adduserSurname'),
							]"
						>
						</q-input>
					</div>
				</div>
				<div class="row">
					<q-input
						class="full-width"
						rounded
						outlined
						ref="user_email"
						v-model="email"
						standout="text-black bg-grey-2"
						type="email"
						:label="$t('login_adduserMailTitle')"
						lazy-rules
						:rules="[
							(val) => !!val || $t('login_adduserMail'),
							isValidEmail,
						]"
						value="{{ defaultEmail }}"
						autocomplete="username"
					>
					</q-input>

					<q-card-actions
						class="q-py-lg full-width justify-center items-center"
					>
						<q-btn
							rounded
							size="lg"
							class="text-white text-lowercase regularButton"
							ref="addUserBtn"
							:label="$t('security_settingsUpdateButton')"
							@click="onSubmit"
						/>
					</q-card-actions>
				</div>
			</div>
		</q-form>
	</q-card>
</template>
<script>
import sharedFunc from "src/pages/environment/Login-Userhandler";
import { ref } from "vue";

export default {
	name: "AdminSettings",

	data() {
		return {
			password: null,
			username: null,
			usersurname: null,
			confirm: false,
		};
	},
	created() {
		this.stepChange = sharedFunc.methods.stepChange;
		(this.isValidEmail = sharedFunc.methods.isValidEmail),
			this.isValidEmail.bind(this);
	},
	methods: {
		async onSubmit() {
			const params = {
				name: this.username,
				lastname: this.usersurname,
				email: this.email,
			};
			try {
				await this.$moralis.Cloud.run("signUpMeta", params);
				this.confirm = true;
			} catch (error) {
				// Show the error message somewhere and let the user try again.
				alert("Error: " + error.code + " " + error.message);
			}
		},
	},
};
</script>

<style scoped>
.metaMaskConfirm {
	width: 550px;
	height: 220px;
}
</style>
