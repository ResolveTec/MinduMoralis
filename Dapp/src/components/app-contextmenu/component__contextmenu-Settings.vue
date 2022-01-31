<template>
	<q-menu fit anchor="top end" self="top start" class="levelContextMenu">
        <q-list>    	                
	        <q-item dense clickable>
	            <q-item-section>Density</q-item-section>
		        <q-item-section side>
	                <q-icon name="keyboard_arrow_right" />
	            </q-item-section>
	            
	            <q-menu auto-close anchor="top end" self="top start" class="levelContextMenu">
					<q-item
		                v-for="n in flows"
		                :key="n"
		                dense
		                no-wrap
		                clickable
		                v-close-popup
		                @click="setFlow(n.value)"
		                >
		                <q-item-section :disabled="(this.flow != n.value ? null : true)">{{ n.label }}</q-item-section>
		                <q-item-section :disabled="(this.flow != n.value ? null : true)">
	                        <q-icon :name="n.avatar" />
	                    </q-item-section>
					</q-item>
				</q-menu>
			</q-item>
			
			<q-item dense clickable>
		        <q-item-section>{{ $t('language') }}</q-item-section>
		        <q-item-section side>
		            <q-icon dense name="keyboard_arrow_right" />
		        </q-item-section>
		            
		        <q-menu auto-close anchor="top end" self="top start" class="levelContextMenu">
					<q-item
		                v-for="n in langs"
		                :key="n"
		                dense
		                no-wrap
		                clickable
		                @click="lang = n"
		                >
		                <q-item-section :disabled="(this.$i18n.locale == n.value ? true : null)">{{ n.label }}</q-item-section>
					</q-item>
				</q-menu>
		    </q-item>
			
			<q-item dense clickable>
	            <q-item-section>Dark Mode</q-item-section>
		        <q-item-section side top>
	                <q-icon dense name="keyboard_arrow_right" />
	            </q-item-section>
	            
	            <q-menu auto-close anchor="top end" self="top start" class="levelContextMenu">
					<q-item
		                v-for="n in modes"
		                :key="n"
		                dense
		                no-wrap
		                clickable
		                @click="this.toggleDark = n"
		                >
		                <q-item-section :disabled="($q.dark.isActive == n.value ? true : null)">{{ n.label }}</q-item-section>
					</q-item>
				</q-menu>
			</q-item>
			
		</q-list>
	</q-menu>
</template>

<script>
	import { useQuasar } from 'quasar'
	import { ref } from "vue"

	export default {
		name: 'ContextMenuSettings',

		setup() {
			const $q = useQuasar()
		},
		data() {
			return {
				flows: [
					{
						label: 'Hi',
						value: true,
						avatar: 'close_fullscreen',
					},
					{
						label: 'Low',
						value: false,
						avatar: 'open_in_full',
					}
				],
				flow: ref(window.AppEtizer.flow),
				langs: [
					{
						label: 'Português',
						value: 'pt-Br'
					},
					{
						label: 'English',
						value: 'en-US',
					}
				],
				lang: this.$i18n.locale,
				modes: [
					{
						label: 'Dark',
						value: true,
					},
					{
						label: 'Light',
						value: false,
					}
				],
				mode: ref(this.toggleDark),
			}
		},
		methods: {
			/* set de qual densidade exibir */
			setFlow(flowStep) {
				this.$root.$flow(flowStep)
			},
		},		
		watch: {
			/* "monitora" mudança em lang e injeta valores correspondentes a lingua adequada */
			lang(lang) {
				this.$i18n.locale = lang.value
				import(`src/i18n/${lang.value}`).then(language => {
					this.$q.lang.set(language.default)
				})
			}
		},
		computed: {
		    toggleDark: {
		        get() {
		            return this.$q.dark.isActive
		        },
		        set(val) {
		            this.$q.dark.set(val.value)
		        }
		    },
		}
	}
</script>