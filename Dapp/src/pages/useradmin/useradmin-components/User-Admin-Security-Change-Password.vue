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
	setup() {
		return {
			isPwd: ref(true),
		};
	},

	data() {
		return {
			password: null,
			confirm: false,
		};
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
