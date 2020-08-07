<template>
	<div>Page404</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Page404 extends Vue {
	created() {
		this.$router.push({ path: location.pathname });
	}
}
</script>
