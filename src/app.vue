<script setup>
import { useFetch } from 'nuxt3/app';

const { data } = await useFetch(() => `/api/versions`, { parseResponse: JSON.parse });

const { envs, versions } = data._value;
</script>

<template>
	<main class="container mx-auto mt-4">
		<h1 class="text-center mb-4">Versions:</h1>
		<table class="versions-table mx-auto">
			<thead>
			<tr>
				<td></td>
				<td><a href="https://github.com/hokify/hokify-justin">GitHub hokify-justin</a></td>
				<td v-for="env in envs">{{ env }}</td>
			</tr>
			</thead>
			<tr v-for="[module, version] in Object.entries(versions)" :key="module">
				<td>{{ module }}</td>
				<td>{{ version.git }}</td>
				<td
						v-for="env in envs"
						:class="{ 'bg-color-yellow': version[env] < version.git }"
				>
					{{ version[env] }}
					<span v-if="version[env] < version.git">⚠</span>
				</td>
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
