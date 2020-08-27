<template>
	<div id="app">
		<div class="header">
			<div class="itemList">
				<div class="item">
					<router-link class="logo" to="/">
						<img src="@/assets/logo-wihte.svg" alt />
					</router-link>
				</div>

				<div class="float_right">
					<router-link class="item" to="/Backoffice"> <i class="el-icon-service"></i> 登入 </router-link>
					<router-link class="item logout" v-if="showLogout" @click="logout">登出</router-link>
					<router-link class="item" to="/Cart">
						<el-badge :value="12" class="item"> <i class="el-icon-shopping-cart-2"></i> 購物車 </el-badge>
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
import { Component, Watch } from 'vue-property-decorator';
import { State, Action, Getter, namespace } from 'vuex-class';
import EventBus from '@/utilities/event-bus';
import Api from '@/api/common.ts';
import Login from './components/Backoffice/Login.vue';

const tokenModule = namespace('token');
const qs = require('qs');

@Component({
	components: {},
})
export default class App extends Vue {
	@tokenModule.State('token') token!: string;
	activeName: string = 'first';
	showLogin: boolean = false;
	showLogout: boolean = false;

	mounted() {
		EventBus.$on('to-scroll', (now: number, next: number) => {
			(this.$refs.childDiv as any).scrollTop = 0;
		});

		EventBus.$on('open-type', (param: any) => {
			this.$router.push({ name: param.type, params: { id: param.id } }).catch(err => {});
		});
	}

	// @Watch('this.token')
	// checkToken() {
	// 	localStorage.getItem('accessToken') ? (this.showLogout = true) : (this.showLogin = true);
	// }

	logout() {
		Api.logout()
			.then(res => {
				// console.log(res);
				localStorage.removeItem('accessToken');
				this.$router.push({ name: 'Login' });
			})
			.catch(err => {});
	}
}
</script>
