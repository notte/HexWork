<template>
	<div id="app">
		<!-- header -->
		<div class="header">
			<div class="itemList">
				<div class="item">
					<router-link class="logo" to="/">
						<img src="@/assets/logo-black.svg" alt />
					</router-link>
				</div>
				<div class="float_right">
					<router-link class="item" to="/Backoffice" v-if="showLogin"><i class="el-icon-service"></i> 登入 </router-link>
					<a class="item logout" v-if="showLogout" @click="logout"> 登出 </a>
					<router-link class="item" to="/Cart">
						<el-badge :value="12" class="item"> <i class="el-icon-shopping-cart-2"></i> 購物車 </el-badge>
					</router-link>
				</div>
			</div>
		</div>
		<!-- router-view -->
		<div class="layout">
			<div class="container" ref="childDiv">
				<router-view class="content" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Model } from 'vue-property-decorator';
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
	activeName: string = 'first';
	showLogin: boolean = false;
	showLogout: boolean = false;
	// @tokenModule.State('token') token!: string;
	@Action('token/setToken') private setToken!: any;
	token: string | null = localStorage.getItem('accessToken');

	created() {
		if (!localStorage.getItem('accessToken')) {
			this.showLogin = true;
		} else {
			this.showLogout = true;
			this.checkToken(this.token);
		}
	}

	checkToken(check: string | null) {
		Api.check(check)
			.then(res => {
				this.showLogout = true;
				this.showLogin = false;
				EventBus.$emit('open-type', 'Backoffice');
			})
			.catch(err => {
				this.showLogout = false;
				this.showLogin = true;
				EventBus.$emit('open-type', 'Login');
			});
	}

	mounted() {
		// EventBus.$on('to-scroll', (now: number, next: number) => {
		// 	(this.$refs.childDiv as any).scrollTop = 0;
		// });

		EventBus.$on('set-tag', (data: string) => {
			this.showLogout = true;
			this.showLogin = false;
		});

		// EventBus.$on('open-type', (param: any) => {
		// 	this.$router.push({ name: param.type, params: { id: param.id } }).catch(err => {});
		// 	this.showLogout = true;
		// 	this.showLogin = false;
		// });
	}

	// 檢測 token 是否存在/是否過期，來決定 登入/登出 的出現按鈕

	// @Watch('this.token')
	// checkToken() {
	// 	localStorage.getItem('accessToken') ? (this.showLogout = true) : (this.showLogin = true);
	// }

	logout() {
		Api.logout(localStorage.getItem('accessToken'))
			.then(res => {
				this.setToken('');
				localStorage.removeItem('accessToken');
				this.showLogout = false;
				this.showLogin = true;
				this.$router.push({ path: '/Login' });
			})
			.catch(err => {});
	}
}
</script>
