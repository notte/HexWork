<template>
	<div>Page404</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Page404 extends Vue {
	segmentCount: number = 0;
	l: any = window.location;

	created() {
		this.l.replace(
			this.l.protocol +
				'//' +
				this.l.hostname +
				(this.l.port ? ':' + this.l.port : '') +
				this.l.pathname
					.split('/')
					.slice(0, 1 + this.segmentCount)
					.join('/') +
				'/?p=/' +
				this.l.pathname
					.slice(1)
					.split('/')
					.slice(this.segmentCount)
					.join('/')
					.replace(/&/g, '~and~') +
				(this.l.search ? '&q=' + this.l.search.slice(1).replace(/&/g, '~and~') : '') +
				this.l.hash
		);

		this.$router.push({ path: location.pathname });
	}
}
</script>
