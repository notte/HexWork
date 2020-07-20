<template>
	<div id="app">
		<div class="header">
			<router-link to="/FirstWeek">W1</router-link>
		</div>

		<router-view class="container" />
		<!-- <el-tabs v-model="activeName">
			<el-tab-pane label="Week 1" name="first">
				<FirstWeek />
			</el-tab-pane>
			<el-tab-pane label="Week 2" name="second">
				<SecondWeek />
			</el-tab-pane>
		</el-tabs>-->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import FirstWeek from '@/components/FirstWeek.vue';
import SecondWeek from '@/components/SecondWeek.vue';

@Component({
	components: {
		FirstWeek,
		SecondWeek,
	},
})
export default class App extends Vue {
	activeName: string = 'first';
}
</script>
