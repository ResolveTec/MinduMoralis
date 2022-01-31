<template>
	
	<q-page class="q-pb-xl">
		<div class="full-width row q-pt-sm">
			<div class="full-width row inline no-wrap">
                <div class="col-2 self-start q-gutter-y-xs q-pt-md">
                    
                    <div class="row block full-width" 
                        v-for="itens in adminLinksObject" 
                        :key="itens.key">
						<div class="col text-h6">
							<q-btn 
								flat dense unelevated 
								type="btn" 
								class="text-h5 q-pa-xs text-capitalize card_left"
								:label="itens.title" 
								@click="currentTab = itens.to" />
						</div>
					</div>
                </div>
                <div class="q-pa-sm full-width">
                    <q-card class="rounded q-pa-lg card_right">
						<div class="full-width row wrap justify-start items-start content-start q-gutter-y-xs">
							<component v-bind:is="currentTabComponent"></component>
							<!-- <router-view name="adminContainer"></router-view> //-->
						</div>
					</q-card>
                </div>
	        </div>    
		</div>
	</q-page>		

</template>

<script>
	import tab_UserAdminProductStepper from './useradmin-components/User-Admin-Product-0.vue'
	import tab_UserAdminPayment from './useradmin-components/User-Admin-Payment.vue'
	import tab_UserAdminCoupon from './useradmin-components/User-Admin-Coupon.vue'
	import tab_UserAdminSecurity from './useradmin-components/User-Admin-Security.vue'
	import tab_UserAdminCustomization from './useradmin-components/User-Admin-Customization.vue'
	
	import { defineAsyncComponent } from "vue"
	
	export default ({
		name: 'Admin',
		
		components: {
			tab_UserAdminProductStepper,
			tab_UserAdminPayment,
			tab_UserAdminCoupon,
			tab_UserAdminSecurity,
			tab_UserAdminCustomization,
		},
		props: {
			urlForward: {
				required: false,
			}
		},
		data() {
			console.log (typeof this.aSyncDyn)
			return {
				currentTab: "UserAdminProductStepper",
				adminLinksObject : [
					{
						title: 'Cursos/Aulas',
						to: 'UserAdminProductStepper',
					},
					{
						title: 'Pagamento',
						to: 'UserAdminPayment',
					},					
					{
						title: 'Cupons',
						to: 'UserAdminCoupon',
					},
					{
						title: 'Segurança',
						to: 'UserAdminSecurity',
					},
					{
						title: 'Personalização',
						to: 'UserAdminCustomization',
					},
				],
				componentName:  this.aSyncDyn
			}
		},
		computed: {
            currentTabComponent: function() {
                if (this.currentTab == 'dyn') {
					return defineAsyncComponent(() => import('./' + this.componentName + '.vue'))
                }
                return "tab_" + this.currentTab;
            },
        },
        methods: {
            aSyncDyn: async (val) => {
				let dynName = this.$route.params.urlForward || val
				this.adminLinksObject.push(
					{
						title: dynName,
						to: 'dyn',
					}
				)
				return (dynName)
			}
        }
	})
</script>

<style>
	.radius {
		border-radius: 15px;
		border:2px solid #efefef;
	}

	.card_right {
		min-height: 320px;
	}
	
	.card_left {
		min-width: 90%;
		float: right;
	}
</style>
