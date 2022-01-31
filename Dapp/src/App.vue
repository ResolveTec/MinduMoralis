<template>
  <router-view />
</template>

<script>
 
	import { defineComponent, onMounted, inject, computed } from 'vue'
	import { useStore } from 'vuex'

	export default defineComponent({
		name: 'App',
				
		setup() {
			/* 
				conselho do Maralis para implementação com metamask porem o quasar "prefere" arquivos no "boot"
				falta consolidar o entendimento de funcionalidades com store/vuex/moralis/quasar para implementação
				global e uso do inject(talvez)
			*/
			
			/*
				Aviso:
				Access to XMLHttpRequest at 'https://biiflg28iijy.usemoralis.com:2053/server/functions/getPluginSpecs' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
			/*
			
			/*
			const store = useStore()
			
			const setUser = (payload) => store.commit('setUser', payload)

			const login = async () => {
				const user = await Moralis.Web3.authenticate()
				setUser(user)
			}
			const logout = async () => {
				await Moralis.User.logOut()
				setUser({})
			}
			const handleCurrentUser = () => {
				const user = Moralis.User.current()
				if (user) {
				setUser(user)
				}
			}
			onMounted(() => {
				handleCurrentUser()
			})

			return {
				login: null,
				logout: null,
				isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
				user: computed(() => store.state.user)
			} 
			*/
			
		},

	})
</script>
