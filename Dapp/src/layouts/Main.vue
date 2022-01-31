<template>
	<q-layout view="hHh lpR fFf">
		<template v-if="flow">
			<!--*/ dense layout /*-->
			<mainHeaderDense identity="Wallet:" :hash="formatWallet(wallet)" />
		</template>

		<template v-else>
			<!--*/ regular layout /*-->
			<mainHeaderRegular :hash="formatWallet(wallet)" />
		</template>

		<div class="wrapper q-px-md q-pb-xl">
			<q-page-container>
				<!--*/ This is where your pages will get injected into your Layout /*-->
				<router-view name="default" />
			</q-page-container>
		</div>

		<q-menu touch-position context-menu>
			<mainContextMenu anchor="top end" />
		</q-menu>
	</q-layout>
</template>

<script>
import mainHeaderDense from "src/layouts/Main-container-Header-dense";
import mainHeaderRegular from "src/layouts/Main-container-Header-regular";

import mainContextMenu from "src/components/component__Layout-ContextMenu";

import { useQuasar } from "quasar";
import { ref } from "vue";
import { mapState } from "vuex";

export default {
	name: "Main",

	components: {
		mainHeaderDense,
		mainHeaderRegular,
		mainContextMenu,
	},
	setup() {
		/*
		const $q = useQuasar();

		// inicia aviso real de clique(botão direito) de contexto depois da firula da página de landing
		$q.notify.registerType("my-notif", {
			icon: "announcement",
			progress: true,
			textColor: "white",
		});

		let randtime = Math.floor(Math.random() * (15000 - 8000)) + 8000;
		setTimeout(() => {
			$q.notify({
				type: "my-notif",
				icon: "contactless",
				message: "Right click anywhere for context menu",
				caption: "It will provide shortcuts and amazing settings",
				color: "blue-grey-8",
				timeout: 10000,
			});
		}, randtime);
		*/
		
		return {
			brand: window.getObjectByKey("default", window.AppEtizer),
		};
	},
	data() {
		
		this.$moralis.User.currentAsync().then(function(user) {
			if (this.$moralis) {
                const currentUser = this.$moralis.User.current()
                if (!currentUser) {
                    if ( confirm("You are kicked out by oath server Moralis")) {
                        this.$router.push("/");
                    }
                }
			}
		}).then( function() { return null });
	
		if (this.$root.$flow !== "undefined") {
			this.$root.$flow = (get) => {
				window.AppEtizer.flow = get; // compatibilidade
				return (this.flow = get);
			};
		}

		return {
			flow: ref(window.AppEtizer.flow),
		};
	},
	methods: {
		formatWallet(hashWallet) {
			
			if (this.$moralis.User.current()) {
				let ethAddress =
					this.$moralis.User.current().attributes.ethAddress;

				if (hashWallet.length == 42) {
					return (
						hashWallet.substring(0, 7) +
						"----" +
						hashWallet.substring(hashWallet.length - 10)
					);
				} else {
					if (ethAddress !== null && ethAddress !== undefined) {
						if (ethAddress.lenght == 42) {
							return (
								ethAddress.substring(0, 7) +
								"----" +
								ethAddress.substring(ethAddress.length - 10)
							);
						}
					} else {
						return "connectWallet";
					}
				}
			} else {
				return null;
			}
		}
	},
	computed: {
		...mapState({ wallet: (state) => state.wallet.numero }),
	},
};
</script>

<style lang="stylus">
@import 'src/css/app-mindu';
</style>
