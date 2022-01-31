<template>
	<div class="arial row inline full-width no-wrap q-pt-md">
		<div class="col-3 radius q-py-md q-mr-sm">
			<div class="column justify-center items-center">
				<div class="row">
					<div
						class="column inline text-uppercase text-h5 text-weight-bold q-pt-sm"
					>
						NEW15
					</div>
					<div class="col self-start">
						<q-icon
							name="edit_note"
							size="2rem"
							class="floating-label q-px-xs q-py-none"
						/>
					</div>
				</div>
			</div>
			<div
				class="column justify-center items-center text-h6 text-weight-thin"
			>
				15%
			</div>
			<div class="column justify-center items-center text-body1">
				Valid thru: 10/10/2021
			</div>
		</div>
		<div class="arial col-3 radius q-py-md q-mr-sm">
			<div class="column justify-center items-center">
				<div class="row">
					<div
						class="column inline text-uppercase text-h5 text-weight-bold q-pt-sm"
					>
						NEW15
					</div>
					<div class="col self-start">
						<q-icon
							name="edit_note"
							size="2rem"
							class="floating-label q-px-xs q-py-none"
						/>
					</div>
				</div>
			</div>
			<div
				class="column justify-center items-center text-h6 text-weight-thin"
			>
				15%
			</div>
			<div class="column justify-center items-center text-body1">
				Valid thru: 10/10/2021
			</div>
		</div>
		<div class="arial col-3 radius q-py-md q-mr-sm">
			<div class="column justify-center items-center">
				<div class="row">
					<div
						class="column inline text-uppercase text-h5 text-weight-bold q-pt-sm"
					>
						NEW15
					</div>
					<div class="col self-start">
						<q-icon
							name="edit_note"
							size="2rem"
							class="floating-label q-px-xs q-py-none"
						/>
					</div>
				</div>
			</div>
			<div
				class="column justify-center items-center text-h6 text-weight-thin"
			>
				15%
			</div>
			<div class="column justify-center items-center text-body1">
				Valid thru: 10/10/2021
			</div>
		</div>
		<div class="arial col-3">
			<div class="column justify-center items-center vertical-middle fit">
				<div class="row">
					<q-btn flat dense unelevated type="btn">
						<q-icon
							name="add_circle_outline"
							size="2.5rem"
							@click="addCoupon = true"
						/>
					</q-btn>
				</div>
				<div class="row text-h5 text-weight-bold">create coupon</div>
			</div>
		</div>
	</div>

	<q-dialog
		v-model="addCoupon"
		persistent
		transition-show="scale"
		transition-hide="scale"
	>
		<couponAdd />
	</q-dialog>
</template>

<script>
import { ref } from "vue";
import couponAdd from "./User-Admin-Coupon-Add.vue";

export default {
	name: "AdminCoupon",

	components: {
		couponAdd,
	},

	data() {
		return {
			addCoupon: ref(null),
		};
	},
};
</script>
