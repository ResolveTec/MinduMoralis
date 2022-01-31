<template>
	<div class="row block full-width">
		<div class="col text-h6">{{ $t("security_title") }}</div>
	</div>
	<div v-if="email" class="arial column inline full-width no-wrap q-pt-md">
		<div class="col-6">E-mail: {{ email }}</div>
		<div class="col-6">
			{{ $t("security_nameLabel") + ": " + name + " " + lastName }}
		</div>
	</div>
	<div v-else class="arial column inline full-width no-wrap q-pt-md">
		<div class="col-6">{{ $t("security_askPersonalData") }}</div>
		<div class="col-6">{{ $t("security_advantagesPersonalData") }}</div>
	</div>
	<div v-if="email" class="arial row inline full-width">
		<div class="col-auto q-pr-xs">
			<q-btn
				type="button"
				rounded
				dense
				size="lg"
				class="text-white text-lowercase regularButton q-my-md"
				@click="chooseModal('changeSettings')"
				:label="$t('security_changePersonalData')"
			>
			</q-btn>
		</div>
		<div class="col-auto q-pr-xs">
			<q-btn
				type="button"
				rounded
				dense
				size="lg"
				class="text-white text-lowercase regularButton q-my-md"
				@click="chooseModal('changePassword')"
				:label="$t('security_changePassword')"
			></q-btn>
		</div>
	</div>
	<div v-else class="arial row inline full-width">
		<div class="col-auto q-pr-xs">
			<q-btn
				type="button"
				rounded
				dense
				size="lg"
				class="text-white text-lowercase regularButton q-my-md"
				@click="chooseModal('settings')"
				:label="$t('security_setPersonalData')"
			></q-btn>
		</div>
	</div>
	<q-dialog
		v-model="set"
		flat
		transition-show="scale"
		transition-hide="scale"
	>
		<user-settings />
	</q-dialog>
	<q-dialog
		v-model="changeSet"
		transition-show="scale"
		transition-hide="scale"
	>
		<change-settings />
	</q-dialog>
	<q-dialog
		v-model="changePass"
		transition-show="scale"
		transition-hide="scale"
	>
		<change-password />
	</q-dialog>
</template>

<script>
import { ref } from "vue";
import settings from "./User-Admin-Security-Settings.vue";
import changeSettings from "./User-Admin-Security-Change-Settings.vue";
import changePassword from "./User-Admin-Security-Change-Password.vue";

export default {
	name: "adminSecurity",

	components: {
		"user-settings": settings,
		"change-settings": changeSettings,
		"change-password": changePassword,
	},
	data() {
		return {
			email: this.$moralis.User.current().attributes.email,
			name: this.$moralis.User.current().attributes.name,
			lastName: this.$moralis.User.current().attributes.last_name,
			changePass: ref(false),
			changeSet: ref(false),
			set: ref(false),
		};
	},
	methods: {
		chooseModal(name) {
			if (name == "settings") {
				this.set = true;
			} else if (name == "changeSettings") {
				this.changeSet = true;
			} else if (name == "changePassword") {
				this.changePass = true;
			}
		},
	},
};
</script>
