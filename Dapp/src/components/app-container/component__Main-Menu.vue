<template>
	<q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
		<!-- drawer content -->
		<div class="column full-height">
		<div class="row">
			<q-list>
			<q-item-label header>Seu acesso</q-item-label>

			<mainMenuEssentialLink
				v-for="link in essentialLinks"
				:key="link.title"
				v-bind="link"
			/>
			</q-list>
		</div>            
		<div class="col ">
		</div>
		<div class="row q-pa-sm">
			<div class="col">
			<q-fab padding="sm" flat round icon="settings" direction="right" fixed-right >
				<q-fab-action square external-label label-position="top" @click="onClick" icon="mail" label="Email" label-class="bg-grey-3 text-grey-8"/>
				<q-fab-action square external-label label-position="top" @click="onClick" icon="account_box" label="Conta" label-class="bg-grey-3 text-grey-8" />
			</q-fab>
			</div>
			<div class="col-auto"></div>
			<div class="no-wrap">
			sair 
			<!--
			<template v-if="metaMaskIsAuthenticated">
				<q-btn flat round icon="logout" fixed-right @click="metaMaskDoLogout"/>
			</template>
			<template v-else>
				//-->
				<q-btn flat round icon="logout" fixed-right />
			<!--
			</template>
			//-->
			</div>
		</div>
		</div>  
	</q-drawer>
</template>
<script>
  	import { ref } from 'vue'
	import mainMenuEssentialLink  from 'src/components/app-container/component__Main-Menu-EssentialLink'

	export default {
		name: 'LayoutMenu',

		components: {
			mainMenuEssentialLink,
		},
		setup() {
			const rightDrawerOpen = ref(false)

			return {
				rightDrawerOpen,
				toggleRightDrawer () { 
					rightDrawerOpen.value = !rightDrawerOpen.value 
				},
				essentialLinks: [
								{
									title: 'Home',
									caption: 'Página inicial',
									icon: 'home',
									link: '/landing'
								},
								{
									title: 'Cursos',
									caption: 'Atualize-se, aperfeiçoe seu conhecimento. Presentei-e um curso',
									icon: 'shopping_cart',
									link: '/courses'
								},
								{
									title: 'Conteúdo',
									caption: 'Sua Agenda, Cursos, Aulas e Certificados',
									icon: 'school',
									link: '/classes'
								},  
								{
									title: 'Contato',
									caption: 'Tire suas dúvidas com a MindU ou com seus professores',
									icon: 'chat',
									link: '/contact'
								},
								{
									title: 'Comunidade',
									caption: 'Converse com outros alunos no fórum da Mindu',
									icon: 'record_voice_over',
									link: '/forum'
								},
								{
									title: 'Sobre Nós',
									caption: 'Sobre a MindU',
									icon: 'info',
									link: '/about'
								}
				],
			}
		},
		methods: {
			onClick() {
				return
			},
		}
	}
</script>
