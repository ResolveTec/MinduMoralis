import { boot } from "quasar/wrappers";
import { ref } from "vue";

export default boot(({ app }) => {
	const _ = (app.config.globalProperties.$_ = require("lodash")); // lodash global -> use no código _ ou no template $_
	const __ = (app.config.globalProperties.$__ = process.env.DEV ? true : false); // debug global -> use no cógido _o_ ou no template $_o_

	/* VUE: busca objeto pai pelo nome */
	window.getVUEComponentByName = (i, componentName) => {
		let component = null;
		let parent = i.$parent;
		while (parent && !component) {
			if (parent.$options.name === componentName) {
				component = parent;
			}
			parent = parent.$parent;
		}
		return component;
	};

	/* OBJETO/ARRAY/CLASSE: busca recursiva pelo nome da chave em todo o Objeto indiferente de valor */
	window.getObjectByKey = (i, haystack, found = []) => {
		if (haystack) {
			Object.keys(haystack).forEach((key) => {
				if (key === i) {
					found.push(haystack[key]);
					return found;
				} else if (typeof haystack[key] === "object") {
					window.getObjectByKey(i, haystack[key], found);
				}
			});
		}
		return found;
	};

	/* busca valor em uma ou mais chaves dentro do objeto não recursivo
	   retorna 
		.data com a Array encontrada e 
		.key com o indice da chave enconrtada na array */
	window.filterObjectByKey = function (i, keys, where) {
		let masterkey = null;
		return {
			data: where.filter((prod, inner) =>
				keys.some(
					(key) =>
						String(prod[key]).toLowerCase((masterkey = inner)) == i
				)
			),
			key: masterkey,
		};
	};

	/* URL: retorna parametro tipo GET da URL */
	window.getUrlParam = (i, defaultvalue) => {
		var urlparameter = defaultvalue;
		if (window.location.href.indexOf(i) > -1) {
			urlparameter = getUrlVars()[i];
		}
		return urlparameter;

		function getUrlVars() {
			let vars = {};
			let parts = window.location.href.replace(
				/[?&]+([^=&]+)=([^&]*)/gi,
				function (m, key, value) {
					vars[key] = value;
				}
			);
			return vars;
		}
	};

	/* gera número randomico de min até max */
	window.rnd = (min = 1, max = 99) => {
		let rand = Math.floor(Math.random() * (max - 1)) + 1;
		return parseInt(rand);
	};
	
	window.AppEtizer = {
		name: "Resolve - VUE Quasar Project",
		flow: process.env.DEV ? true : false,
		themes: {
			default: "mindu",
			mindu: {
				project: "Mindu",
				version: 1.2,
			},
			nubank: {
				project: "NU Bank",
				version: 1.0,
			},
		},
	};

	/* reserva/set globais */
	app.config.globalProperties.$cube = () => {};
	app.config.globalProperties.$appstore = () => {};
	app.config.globalProperties.$appactions = () => {};
	app.config.globalProperties.$appetizer = window.AppEtizer;
	app.config.globalProperties.$flow = window.AppEtizer.flow;

	app.config.globalProperties.window = window;
});
