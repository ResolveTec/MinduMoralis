<template>
	<q-list dense class="levelContextMenu">
		<q-item clickable v-close-popup to="/landing">
			<q-item-section>Home</q-item-section>
		</q-item>
		<q-item clickable>
			<q-item-section>Settings</q-item-section>
			<q-item-section side>
				<q-icon name="keyboard_arrow_right" />
			</q-item-section>

			<contextSettings />
		</q-item>

		<q-separator />

		<q-item clickable v-if="$__">
			<q-item-section>Quick Loading</q-item-section>
			<q-item-section side>
				<q-icon name="keyboard_arrow_right" />
			</q-item-section>

			<contextTools />
		</q-item>

		<q-separator />

		<q-item clickable v-close-popup>
			<q-item-section @click="doClick()">Quit</q-item-section>
		</q-item>
	</q-list>
</template>

<script>
import clicky from "vue-clicky"

import contextSettings from "./app-contextmenu/component__contextmenu-Settings.vue"
import contextTools from "./app-contextmenu/component__contextmenu-Tools.vue"

export default {
	name: "ContextMenu",

	components: {
		contextSettings,
		contextTools,
	},
	props: {
		anchor: {
			type: String,
			required: false,
			default: "top end",
		},
	},
	methods: {
		doClick() {
			console.log('Click')
			//clicky()
		},
	},
};
</script>