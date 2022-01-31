<template>
	<q-card :flat="true" class="full-width justify-center items-center" v-if="confirm == true">
		<q-card-section class="q-pb-sm">{{ $t("security_message") }}</q-card-section>
	</q-card>

	<q-card v-else :flat="true" class="full-width justify-center items-center">
		<q-card-section class="q-pb-sm">
			<div class="column">
				<div class="col self-center q-pb-lg">
					<img src="~assets/logo-mindu.svg" width="144" height="144" />
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
					<q-input
						class="full-width"
						rounded
						outlined
						ref="user_passw"
						v-model="password"
						standout="text-black bg-grey-2"
						:type="isPwd ? 'password' : 'text'"
						:label="$t('login_adduserPasswordTitleShort')"
						lazy-rules
						:rules="[
							(val) => !!val || $t('login_adduserPassword'),
							isValidPassword,
						]"
						value="{{ defaultPass }}"
						autocomplete="current-password"
					>
						<template v-slot:append>
							<q-icon
								:name="isPwd ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="isPwd = !isPwd"
							/>
						</template>
					</q-input>
					<div
						class="column text-grey-8 text-weight-thin text-center"
					>
						<div class="row q-pb-sm q-px-xl">
							{{ $t("login_adduserPasswordRules") }}
						</div>
					</div>
					<q-card-actions
						class="q-py-lg full-width justify-center items-center"
					>
						<q-btn
							rounded
							size="lg"
							class="text-white text-lowercase regularButton"
							ref="addUserBtn"
							:label="$t('security_settingsButton')"
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
	setup() {
		return {
			isPwd: ref(true),
		};
	},

	data() {
		return {
			email: null,
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
		/* hardcode validation */
		isValidPassword(regPass) {
			const passwordPatter =
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
			return (
				passwordPatter.test(regPass) || this.$t("login_isValidPassword")
			);
		},

		async onSubmit() {
			const params = {
				name: this.username,
				lastname: this.usersurname,
				email: this.email,
				password: this.password,
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
