<template>
	<q-card
		class="row q-gutter-md justify-center items-center full-width bg-white text-black no-scroll addCouponDialog"
	>
		<q-card-section
			class="row justify-center items-center full-width q-px-xl"
		>
			<div class="row text-h5 q-pb-xl">New Coupon</div>
			<div class="row full-width">
				<div class="col q-col-gutter-y-md">
					<div
						class="row q-gutter-sm q-my-sm justify-center items-center"
					>
						<div class="q-col-gutter-y-md">
							<q-btn
								type="button"
								rounded
								dense
								size="lg"
								class="text-white text-lowercase regularButton"
								@click="toggleDialog()"
								:label="' % '"
							/>
						</div>
						<div class="q-col-gutter-y-md">
							<q-btn
								type="button"
								rounded
								dense
								size="lg"
								class="text-white text-lowercase regularButton"
								@click="toggleDialog()"
								:label="' $ '"
							/>
						</div>
						<div class="q-col-gutter-y-md">
							<q-input
								rounded
								outlined
								ref="desc"
								v-model="desc"
								type="desc"
								class="inline q-pt-none"
								label="discount"
							>
							</q-input>
						</div>
					</div>

					<div class="row">
						<q-input
							rounded
							outlined
							ref="codigo"
							v-model="codigo"
							type="codigo"
							class="full-width"
							label="coupon ID"
						>
						</q-input>
					</div>
					<div class="row">
						<q-input
							rounded
							outlined
							ref="curso"
							v-model="curso"
							type="select"
							class="full-width"
							label="select course"
						>
							<template v-slot:append>
								<q-icon name="arrow_downward" />
							</template>
						</q-input>
					</div>
					<div class="row">
						<q-input
							rounded
							outlined
							ref="dateexp"
							v-model="dateexp"
							type="dateexp"
							class="full-width"
							label="expires at"
						>
							<template v-slot:append>
								<q-icon name="date_range" />
							</template>
						</q-input>
					</div>
					<div class="row">
						<q-input
							rounded
							outlined
							ref="curso"
							v-model="curso"
							type="curso"
							class="full-width"
							label="coupons qtdy"
						>
						</q-input>
					</div>
				</div>
			</div>

			<q-space />

			<q-card-actions
				class="row q-py-xl q-gutter-md justify-center items-center full-width"
			>
				<div class="q-col-gutter-y-md">
					<q-btn
						type="button"
						rounded
						dense
						size="lg"
						class="text-white text-lowercase regularButton q-my-md"
						@click="toggleDialog()"
						label="Cancel"
					/>
				</div>
				<div class="q-col-gutter-y-md">
					<q-btn
						type="button"
						rounded
						dense
						size="lg"
						class="text-white text-lowercase regularButton q-my-md"
						@click="toggleDialog()"
						label="Create"
					/>
				</div>
			</q-card-actions>
		</q-card-section>
	</q-card>
</template>

<script>
export default {
	name: "AdminCouponAdd",

	methods: {
		/* controle de qual tela exbibir */
		toggleDialog() {
			this.$parent["$parent"].hide();
		},
	},
};
</script>

<style>
.radius {
	border-radius: 15px;
	border: 2px solid #efefef;
}

.addCouponDialog {
	width: 760px;
	height: 560px;
	border-radius: 20px;
}
</style>
