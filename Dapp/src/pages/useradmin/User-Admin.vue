<template>
	<q-page class="q-pb-xl">
		<div class="q-pt-sm">
			<div class="no-wrap">
				<q-splitter v-model="splitterModel" :limits="[8, 60]">
					<template v-slot:before>
						<q-tabs v-model="tab" vertical class="">
							<q-tab
								name="courses"
								icon="class"
								label="courses"
							/>
							<!-- <q-tab name="payment" icon="paid" label="payment" /> -->
							<q-tab
								name="coupon"
								icon="local_activity"
								label="coupon"
							/>
							<q-tab
								name="security"
								icon="admin_panel_settings"
								label="security"
							/>
							<q-tab name="adjusts" icon="tune" label="adjusts" />
						</q-tabs>
					</template>
					<template v-slot:after>
						<q-tab-panels
							v-model="tab"
							animated
							swipeable
							vertical
							transition-prev="jump-up"
							transition-next="jump-up"
							class="fit"
						>
							<q-tab-panel name="courses">
								<div class="card_right no-scroll">
									<div class="text-h4 q-mb-md">
										Courses/Classes
									</div>
									<tab_UserAdminProductStepper />
								</div>
							</q-tab-panel>

							<!-- <q-tab-panel name="payment">
				                <div class="card_right no-scroll">
				                    <div class="text-h4 q-mb-md">Pagamento</div>
				                    <tab_UserAdminPayment />
				                </div>
				            </q-tab-panel> -->

							<q-tab-panel name="coupon">
								<div class="card_right no-scroll">
									<div class="text-h4 q-mb-md">Coupons</div>
									<tab_UserAdminCoupon />
								</div>
							</q-tab-panel>

							<q-tab-panel name="security">
								<div class="card_right no-scroll">
									<div class="text-h4 q-mb-md">Security</div>
									<tab_UserAdminSecurity />
								</div>
							</q-tab-panel>

							<q-tab-panel name="adjusts">
								<div class="card_right no-scroll">
									<div class="text-h4 q-mb-md">
										Customization
									</div>
									<tab_UserAdminCustomization />
								</div>
							</q-tab-panel>
						</q-tab-panels>
					</template>
				</q-splitter>
			</div>
		</div>
	</q-page>
</template>

<script>
import { ref } from "vue";

import tab_UserAdminProductStepper from "./useradmin-components/User-Admin-Product.vue";
import tab_UserAdminPayment from "./useradmin-components/User-Admin-Payment.vue";
import tab_UserAdminCoupon from "./useradmin-components/User-Admin-Coupon.vue";
import tab_UserAdminSecurity from "./useradmin-components/User-Admin-Security.vue";
import tab_UserAdminCustomization from "./useradmin-components/User-Admin-Customization.vue";

export default {
	name: "Admin",

	components: {
		tab_UserAdminProductStepper,
		//tab_UserAdminPayment,
		tab_UserAdminCoupon,
		tab_UserAdminSecurity,
		tab_UserAdminCustomization,
	},
	setup() {
		return {
			tab: ref("courses"),
			splitterModel: ref(8),
		};
	},
};
</script>

<style>
.radius {
	border-radius: 15px;
	border: 2px solid #efefef;
}

.card_left {
	min-height: 320px;
	width: 150px !important;
}

.card_right {
	width: 100%;
}
</style>
