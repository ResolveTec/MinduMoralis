import { ref, watch, onMounted, onUnmounted } from 'vue'

const useLocalStorage = (key, defaultValue) => {
	
	const value = ref(defaultValue);
	
	const read = function() {
		let v = window.localStorage.getItem(key);
		if (v != null) {
			value.value = JSON.parse(v);
		}
	}()

	onMounted(function() {
		window.addEventListener('storage',read);
	});
	onUnmounted(function() {
		window.removeEventListener('storage', read);
	});

	const write = function() {
		window.localStorage.setItem(key, JSON.stringify(value.value));
	}
	watch([value], write, { deep: true});

	return (value);
}

export const useLocalData = function() {
	return useLocalStorage('UUID',[]);
}