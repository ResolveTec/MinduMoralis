<template>
	<q-header reveal class="wrapperHeader text-dark non-selectable">
		<q-banner class="gradient text-white vertical-middle shadow-24 headerBanner q-ma-md" >
			<div class="row full-height justify-center items-center">
				<div class="row full-height items-center">
					<div class="row full-height justify-center items-center">
						
						<mainHeaderLogo :title="$t('main_project_name')" class="headerLogo" />
							
						<div class="row inline-block justify-center items-center q-pl-md">
							<div class="row full-height" >
								<div class="float-left text-h4">
									{{ $t("main_project_name") }}{{ $t("main_project_surname") }}
								</div>
							</div>
							<div v-if="currentUser">
								<div v-if="identity" class="q-pr-sm inline-block" >
									{{ identity }}
								</div>
								<div v-if="hash != 'connectWallet'" class="rounded smallButton text-white inline-block">
									{{ hash }}
								</div>
								<div v-else class="rounded smallButton text-white inline-block" @click="linkWallet">
									{{ $t("main_unconnectedWallet") }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<q-space />
				<!--// <mainHeaderUserAction icon="trending_up" label="relatório" href="#" /> //-->
				<!-- <mainHeaderUserAction icon="build" label="ferramentas" to="#contextMenu" css="flip-horizontal" /> -->
				<mainHeaderUserAction icon="settings" :label="$t('main_btn_settings')" href="/admin" />
				
				<mainHeaderUserAction icon="login" :label="$t('main_btn_login')" href="/userlogin" v-if="!currentUser"/>
                <mainHeaderUserAction icon="logout" label="Logout" href="/userlogout" v-if="currentUser"/>
			</div>
		</q-banner>
	</q-header>

	<mainMenu />
</template>

<script>
import Web3 from "web3";
import { computed } from "vue";
import { useStore } from "vuex";
import mainHeaderLogo from "src/components/app-container/component__Main-Header-Logo";
import mainHeaderUserAction from "src/components/app-container/component__Main-Header-UserAction";
import mainMenu from "src/components/app-container/component__Main-Menu";
import { ref } from "vue"
import { useLocalData } from "src/plugins/localstorage";

export default {
	name: "HeaderAdmin",

	components: {
		mainHeaderLogo,
		mainHeaderUserAction,
		mainMenu,
	},
	props: {
		hash: {
			type: String,
			required: false,
		},
		identity: {
			type: String,
			required: false,
		},
	},
	setup() {	
		const $store = useStore();
		const wallet = computed({
			get: () => $store.state.wallet.numero,
			set: (val) => {
				$store.commit("wallet/updateWallet", val);
			},
		});

		const localdata = useLocalData();

		return {
			localdata,
			wallet,
		};
	},
	data() {
        return {
            currentUser: ref(this.$moralis.User.current())
        }
    },
	methods: {
		async linkWallet() {
			const web3Provider = await this.$moralis.enableWeb3();
			const web3Js = new Web3(this.$moralis.provider);
			let account = await web3Js.currentProvider.enable();

			var cart = "";
			await this.$moralis.link(account[0]).then(
				(response) => {
					cart = account[0];
				},
				(reject) => {
					alert(reject);
				}
			);
			if (cart) {
				this.wallet = cart;
			}
		},
	},
};
</script>

<style scoped>
.headerBanner {
	height: 11vh;
	min-width: 580px;
}

.headerLogo {
	width: 60px;
	height: 60px;
}

BODY {
	height: 16vh;
	background-image: url("~assets/background_header.svg");
	background-repeat: repeat-x;
}
</style>
