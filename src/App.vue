<template>
	<div id="app">
		<div class="header">
			<div class="itemList">
				<div class="item">
					<router-link class="logo" to="/">
						<img src="@/assets/logo-wihte.svg" alt />
					</router-link>
				</div>
				<!-- <router-link class="item" to="/Taiwan">精選行程</router-link>
				<router-link class="item" to="/Foreign">國外旅行</router-link>-->

				<div class="float_right">
					<router-link class="item" to="/Backoffice">
						<i class="el-icon-service"></i> 登入
					</router-link>
					<router-link class="item" to="/Cart">
						<el-badge :value="12" class="item">
							<i class="el-icon-shopping-cart-2"></i> 購物車
						</el-badge>
					</router-link>
				</div>
			</div>
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
import Api from '@/api/common.ts';

@Component({
	components: {},
})
export default class App extends Vue {
	activeName: string = 'first';

	mounted() {
		EventBus.$on('to-scroll', (now: number, next: number) => {
			(this.$refs.childDiv as any).scrollTop = 0;
		});

		EventBus.$on('open-type', (param: any) => {
			this.$router.push({ name: param.type, params: { id: param.id } }).catch((err) => {});
		});
	}
}
</script>
