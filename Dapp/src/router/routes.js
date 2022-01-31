const routes = [
	{
		path: "/",
		component: () => import("layouts/Main.vue"),
		children: [
			{
				path: "/",
				alias: "/landing",
				name: $t("landing"),
				components: {
					default: () => import("src/pages/environment/Landing.vue"),
				},
				meta: {
					requiresAuth: false,
				},
			},
			{
				path: "/forum",
				name: $t("forum"),
				components: {
					default: () => import("pages/Main-Forum.vue"),
				},
				meta: {
					requiresAuth: true,
				},
			},
			{
				path: "/courses",
				alias: "/cursos",
				name: $t("courses"),
				components: {
					default: () => import("pages/Main-Courses.vue"),
				},
				meta: {
					requiresAuth: true,
				},
			},
			{
				path: "/classes",
				alias: "/aulas",
				name: $t("classes"),
				components: {
					default: () => import("pages/Main-Classes.vue"),
				},
				meta: {
					requiresAuth: false,
				},
			},
			{
				path: "/lab",
				alias: "/testes",
				name: $t("testes"),
				component: () => import("/src/pages/lab/Matheus.vue"),
				meta: {
					requiresAuth: true,
				},
			},
			{
				path: "/contact",
				alias: "/contato",
				name: $t("contact"),
				components: {
					default: () => import("pages/Main-Contact.vue"),
				},
				meta: {
					requiresAuth: false,
				},
			},
			{
				path: "/about",
				alias: "/sobre",
				name: $t("about"),
				components: {
					default: () => import("pages/Main-About.vue"),
				},
				meta: {
					requiresAuth: false,
				},
			},
			{
				path: "/userlogin",
				alias: "/acesso",
				name: $t("login"),
				components: {
					default: () =>
						import("src/pages/environment/Login-Userhandler.vue"),
				},
				meta: {
					requiresAuth: false,
				},
			},
			{
				path: "/userlogout",
				alias: "/sair",
				name: $t("logout"),
				components: {
					default: () =>
						import("src/pages/environment/userhandler-components/Userhandler-Action_Logout.vue"),
				},
				meta: { }
			},
			// admin path
			{
				path: "/admin",
				name: $t("admin"),
				components: {
					default: () =>
						import("/src/pages/useradmin/User-Admin.vue"),
				},
				meta: {
					requiresAuth: false,
				},
				children: [
					{
						path: "landing",
						name: $t("adm landing"),
						components: {
							adminContainer: () =>
								import(
									"/src/pages/useradmin/User-Admin-Landing.vue"
								),
						},
					},
					{
						path: ":urlForward",
						name: $t("admin"),
						components: {
							default: () =>
								import("/src/pages/useradmin/User-Admin.vue"),
						},
						props: {
							default: (route) => ({
								page: route.params.urlForward,
							}),
						},
					},
					/*
		            { path: 'onCourses/:course_edit_id', 
				        name: $t('adm edit course'),
				        components: {
				            adminContainer: () => import('/src/pages/useradmin/useradmin-components/User-Admin-Product-Course.vue'),
						},
				        props: {
				            adminContainer: route => ({ course_edit_id: route.params.course_edit_id }),
				        }
			        },    
			        { path: 'onClasses/:course_edit_id/:classe_edit_id', 
			            name: $t('adm edit classe'),
			            components: {
			                adminContainer: () => import('/src/pages/useradmin/useradmin-components/User-Admin-Product-Class.vue'),
						},
			            props: {
				            adminContainer: route => ({ course_edit_id: route.params.course_edit_id, classe_edit_id: route.params.classe_edit_id }),
						}
			        },
			        */
				],
			},
		],
	},
	{
		path: "/nft",
		component: () => import("layouts/NFT.vue"),
		children: [
			{
				path: "course",
				alias: "course",
				name: $t("course"),
				component: () => import("src/pages/nfts/CourseNFT.vue"),
			},
			{
				path: "registration",
				alias: "registration",
				name: $t("registration"),
				component: () => import("src/pages/nfts/Registration.vue"),
			},
			{
				path: "certificate",
				alias: "certificate",
				name: $t("certificate"),
				component: () => import("src/pages/nfts/Certificate.vue"),
			},
		],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/environment/Error404.vue"),
	},
];

function $t(val) {
	return val;
}

export default routes;
