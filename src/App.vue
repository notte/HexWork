<template>
	<div id="app">
		<div class="header">
			<!-- <router-link class="logo" to="/">
				<img src="@/assets/logo-wihte.svg" alt />
			</router-link>
			<router-link class="item" to="/Taiwan">台灣旅行</router-link>
			<router-link class="item" to="/Foreign">國外旅行</router-link> -->
			<router-link class="item" to="ThirdWeek">第三週</router-link>
			<router-link class="item" to="FourthWeek">第四週</router-link>
			<router-link class="item" to="FifthWeek">第五週</router-link>
		</div>
		<div class="layout">
			<div class="container" ref="childDiv">
				<router-view class="content" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import EventBus from '@/utilities/event-bus';

@Component({
	components: {},
})
export default class App extends Vue {
	activeName: string = 'first';

	mounted() {
		EventBus.$on('to-scroll', (now: number, next: number) => {
			(this.$refs.childDiv as any).scrollTop = 0;
		});
	}
}
</script>
