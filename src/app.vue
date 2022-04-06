<script setup>
import { useFetch } from 'nuxt3/app';

const { data } = await useFetch(() => `/api/versions`);
const versions = Object.entries(data._value);
</script>

<template>
	<main class="container mx-auto mt-4">
		<h1 class="text-center mb-4">Versions:</h1>
		<table>
			<tr v-for="[module, version] in versions" :key="version">
				<td class="p-2 border border-black">Module: {{ module }}</td>
				<td class="p-2 border border-black">{{ version }}</td>
			</tr>
		</table>
	</main>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style scoped></style>
