<template>
	<div class="arial column full-width no-wrap q-gutter-sm q-pt-md disabled">
		<div class="row items-center content-center">
			<div class="col-2">Buttons</div>
			<div class="col-2">
				<q-btn
					type="button"
					rounded
					dense
					size="md"
					class="text-white text-lowercase smallButton"
					label="example"
				/>
			</div>
		</div>
		<div class="row items-center content-center">
			<div class="col-2">Buttons Texts</div>
			<div class="col-2">
				<q-btn
					type="button"
					rounded
					dense
					size="md"
					class="text-white text-lowercase smallButton"
					label="example"
				/>
			</div>
		</div>
		<div class="row items-center content-center">
			<div class="col-2">Boxes</div>
			<div class="col-2 gradient roundedSmallCorners text-white">
				&nbsp;
			</div>
		</div>
		<div class="row items-center content-center">
			<div class="col-2">Progress Bar</div>
			<div class="col-2">
				<q-linear-progress
					rounded
					size="lg"
					:value="0.7"
					color="accent"
					class="q-mt-sm"
				/>
			</div>
		</div>
		<div class="row items-center content-center">
			<div class="col-2">Logo Upload</div>
			<div class="col-2">
				<q-icon name="add_circle_outline" size="lg" />
			</div>
		</div>
	</div>
</template>
