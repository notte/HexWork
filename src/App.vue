<template>
	<div id="app">
		<div class="header">
			<router-link class="logo" to="/">
				<img src="@/assets/logo-wihte.svg" alt />
			</router-link>
			<router-link class="item" to="/Taiwan">台灣旅行</router-link>
			<router-link class="item" to="/Foreign">國外旅行</router-link>
		</div>
		<div class="project_container">
			<router-view class="container" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
	components: {},
})
export default class App extends Vue {
	activeName: string = 'first';
}
</script>
