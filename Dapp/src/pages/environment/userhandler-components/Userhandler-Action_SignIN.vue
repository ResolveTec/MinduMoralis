<template>
	<div class="column q-pa-lg">
		<div class="row loginCard">
			<q-card
				v-if="notLogged"
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
							{{ $t("login_accessDoesntHaveAccount") }}
							<q-btn
								flat
								class="q-pa-none no-hover text-accent"
								:label="$t('login_accessCreateAccount')"
								@click="stepChange(true)"
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
								(val) =>
									loginType == 'wallet'
										? true
										: !!val || $t('login_accessMail'),
								isValidEmail,
							]"
							autocomplete="username"
						>
						</q-input>
						<q-input
							class="full-width q-pb-xs"
							rounded
							outlined
							ref="user_passw"
							standout="text-black bg-grey-2"
							v-model="password"
							:label="$t('login_adduserPasswordTitleShort')"
							:type="isPwd ? 'password' : 'text'"
							lazy-rules
							:rules="[
								(val) =>
									loginType == 'wallet'
										? true
										: !!val || $t('login_accessPassword'),
							]"
							autocomplete="current-password"
						>
							<template v-slot:append>
								<q-icon
									:name="
										isPwd ? 'visibility_off' : 'visibility'
									"
									class="cursor-pointer"
									@click="isPwd = !isPwd"
								/>
							</template>
						</q-input>
						<div
							class="row text-grey-8 text-weight-thin text-center"
						>
							<div class="q-bt-none">
								<q-btn
									flat
									class="q-py-md no-hover text-accent"
									:label="$t('login_accessPassWAsk')"
									@click="stepChange(false)"
									no-caps
								/>
							</div>
							<q-card-actions
								class="q-px-lg full-width justify-center items-center"
							>
								<q-btn
									type="button"
									rounded
									size="lg"
									class="text-white text-lowercase regularButton"
									padding="sm lg"
									:label="$t('login_accessLogin')"
									@click="emailLogin"
								/>
							</q-card-actions>
							<q-card-actions
								class="q-px-lg full-width justify-center items-center"
							>
								<q-btn
									type="button"
									rounded
									size="lg"
									class="text-white text-lowercase regularButton"
									padding="sm lg"
									:label="$t('login_accessMetaMask')"
									@click="walletLogin"
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
import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";
import sharedFunc from "src/pages/environment/Login-Userhandler";

export default {
	name: "UserActionSignIn",

	setup() {
		const $store = useStore();
		const wallet = computed({
			get: () => $store.state.wallet.numero,
			set: (val) => {
				$store.commit("wallet/updateWallet", val);
			},
		});
		return {
			isPwd: ref(true),
			router: useRouter(),
			redirectTo: window.getUrlParam("redirect", ""),
			wallet,
		};
	},
	data() {
		return {
			email: null,
			password: null,
			loginType: "email",
			notLogged: true,
		};
	},
	methods: {
		/* redirect de páginas que exigem acesso controlado */
		async emailLogin() {
			let cart = "";
			try {
				const sign = await this.$moralis.User.logIn(
					this.email,
					this.password
				).then(function (user) {
					cart = user.get("ethAddress");
				});
			} catch (error) {
				alert(error);
			}

			if (cart) {
				this.wallet = cart;
			} else {
				this.wallet = "email";
				this.notLogged = false;
			}

			if (this.redirectTo) {
				this.router.push({
					path: this.redirectTo,
				});
				//toggleRightDrawer = true
			}
		},
		async walletLogin() {
			this.loginType = "wallet";
			let cart = "";
			await this.$moralis.authenticate().then(function (user) {
				cart = user.get("ethAddress");
			});
			if (cart) {
				this.wallet = cart;
				this.notLogged = false;
			}

			if (this.redirectTo) {
				this.router.push({
					path: this.redirectTo,
				});
				//toggleRightDrawer = true
			}
		},
	},
	created() {
		this.stepChange = sharedFunc.methods.stepChange;
		(this.isValidEmail = sharedFunc.methods.isValidEmail),
			this.isValidEmail.bind(this);
	},
};
</script>
