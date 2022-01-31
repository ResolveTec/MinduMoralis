<template>
	<q-btn flat class="useraction no-hover q-pa-none" tag="a" :to="to ? void 0 : href" >
		<q-item class="column q-my-sm justify-between items-center text-no-wrap" >
			<div :class="'row ' + css">
				<q-icon :name="'o_' + icon" :style="'font-size:' + iconsize" />
			</div>
			<div class="row text-lowercase">{{ label }}</div>
		</q-item>
		<q-menu fit self="top start" class="levelContextMenu" v-if="to == '#contextMenu'" >
			<headerContextMenu anchor="bottom left" />
		</q-menu>
	</q-btn>
	<!--// Menu <q-btn dense flat round icon="menu" @click="toggleRightDrawer" fixed-right /> //-->
</template>

<script>
import headerContextMenu from "src/components/component__Layout-ContextMenu.vue";

export default {
	name: "UserhandlerAction",

	components: {
		headerContextMenu,
	},
	props: {
		icon: {
			type: String,
			required: true,
			default: "info",
		},
		iconsize: {
			type: String,
			required: false,
			default: "3em",
		},
		label: {
			type: String,
			required: true,
			default: "unset",
		},
		href: {
			type: String,
			required: false,
			default: "#",
		},
		to: {
			type: String,
			required: false,
		},
		css: {
			type: String,
			required: false,
			default: "",
		},
	},
};
</script>

<style>
.useraction {
	width: 100px;
}
</style>
