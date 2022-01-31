<template>
	<div class="column q-pa-lg">
		<div v-if="confirm == true">
			{{ $t("login_validateEmail") }}
		</div>

		<div v-else class="row loginCard">
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
							{{ $t("login_alreadyHaveAccount") }}
							<q-btn
								flat
								class="q-pa-none no-hover text-accent"
								:label="$t('login_already')"
								@click="stepChange(null)"
								no-caps
							/>
						</div>
					</div>
				</q-card-section>

				<q-form>
					<div class="justify-center items-center">
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
									(val) =>
										!!val || $t('login_adduserPassword'),
									isValidPassword,
								]"
								value="{{ defaultPass }}"
								autocomplete="current-password"
							>
								<template v-slot:append>
									<q-icon
										:name="
											isPwd
												? 'visibility_off'
												: 'visibility'
										"
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
								<div class="row block">
									<q-checkbox
										dense
										size="xs"
										ref="user_accept_all"
										v-model="accept_all"
										type="checkbox"
										:label="$t('login_askforSiteRules')"
										color="green-3"
									/>
								</div>
								<div class="row block">
									<q-checkbox
										dense
										size="xs"
										ref="user_accept_metamask"
										v-model="accept_metamask"
										type="checkbox"
										:label="$t('login_askforMetaMask')"
										color="green-3"
									/>
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
									:disable="this.accept_all ? false : true"
									:label="
										$t('login_askforCreate') +
										(this.accept_metamask
											? ' ' +
											  $t(
													'login_askforCreateWithMetaMask'
											  )
											: '')
									"
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
import { useRouter } from "vue-router";
import sharedFunc from "src/pages/environment/Login-Userhandler";

export default {
	name: "UserActionSignUp",

	setup() {
		return {
			metaMaskConfirm: ref(false),
			isPwd: ref(true),
			router: useRouter(),
			redirectTo: window.getUrlParam("redirect", ""),
		};
	},
	data() {
		return {
			email: null,
			password: null,
			username: null,
			usersurname: null,
			accept_metamask: ref(false),
			accept_all: ref(false),
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
		redirect() {
			window.location.href(this.redirectTo);
		},

		async onSubmit() {
			if (!this.accept_metamask) {
				const params = {
					name: this.username,
					lastname: this.usersurname,
					email: this.email,
					password: this.password,
				};

				try {
					const sign = await this.$moralis.Cloud.run(
						"signNewUser",
						params
					);

					this.confirm = true;
				} catch (error) {
					// Show the error message somewhere and let the user try again.
					alert("Error: " + error.code + " " + error.message);
				}
				if (this.confirm == true) {
					try {
						//	await new Promise((r) => setTimeout(r, 5000));
						var cart = "";
						await this.$moralis.User.logIn(
							this.email,
							this.password
						).then(function (user) {
							cart = user.get("ethAddress");
						});

						if (cart !== "" && cart !== undefined) {
							this.wallet = cart;
						} else {
							this.wallet = "email";
						}
					} catch (error) {
						alert(error);
					}

					if (this.redirectTo) {
						this.redirect();
					}
				}
			} else {
				let cart = "";
				await this.$moralis.authenticate().then((user) => {
					cart = user.get("ethAddress");
					const params = {
						name: this.username,
						lastname: this.usersurname,
						email: this.email,
						password: this.password,
					};
					try {
						this.$moralis.Cloud.run("signUpMeta", params);
					} catch (error) {
						// Show the error message somewhere and let the user try again.
						alert("Error: " + error.code + " " + error.message);
					}
				});
				if (cart) {
					this.wallet = cart;
				}

				if (this.redirectTo) {
					this.router.push({
						path: this.redirectTo,
					});
				}
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
