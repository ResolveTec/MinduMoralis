<template>
	<q-menu fit anchor="top end" self="top start" class="levelContextMenu">
		<q-list>
			<div v-for="n in routes[0].children" :key="n">
				<q-item
					dense
					clickable
					active-class
					no-wrap
					:to="n.path"
					v-if="!n.meta.hidden" >
					<q-item-section class="text-capitalize">{{ n.name }}</q-item-section>
					<q-item-section side>
						<q-icon name="lock" v-if="n.meta.requiresAuth" />
					</q-item-section>
					<!--
                    <q-menu auto-close anchor="top end" self="top start">
                        <q-list>
                            <q-item
                            v-for="n in 2"
                            :key="n"
                            dense
                            clickable
                                >
                                <q-item-section>Nível Extra para Login/Share?</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                   //-->
				</q-item>
			</div>
		</q-list>
	</q-menu>
</template>

<script>
import routes from "src/router/routes";
import { useRouter } from "vue-router";

export default {
	name: "ContextMenuTools",

	setup() {
		return {
			routes,
			router: useRouter(),
			//	oath: window.getObjectByKey("oathHere", routes),
		};
	},
};
</script>
