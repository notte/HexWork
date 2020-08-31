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
					<router-link class="item" to="/Backoffice" v-if="showLogin">
						<i class="el-icon-service"></i> 登入
					</router-link>
					<a class="item logout" v-if="showLogout" @click="logout">登出</a>
					<router-link class="item" to="/Cart">
						<el-badge :value="12" class="item">
							<i class="el-icon-shopping-cart-2"></i> 購物車
						</el-badge>
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
	token: string | null = localStorage.getItem('accessToken');
	@Action('token/setToken') private setToken!: any;

	created() {
		// 如果無法取得 token，顯示登入按鈕
		if (!localStorage.getItem('accessToken')) {
			this.showLogin = true;
			// 如果有取得 token，顯示登出按鈕並確認 token 是否過期
		} else {
			this.showLogout = true;
			this.checkToken(this.token);
		}
	}

	checkToken(check: string | null) {
		Api.check(check)
			.then((res) => {
				// token 沒過期
				this.showLogout = true;
				this.showLogin = false;
			})
			.catch((err) => {
				// token 過期
				this.showLogout = false;
				this.showLogin = true;
			});
	}

	mounted() {
		EventBus.$on('set-tag', () => {
			this.showLogout = true;
			this.showLogin = false;
		});

		// 接收切換 router 及頁面的事件，打包參數一併傳遞
		EventBus.$on('open-type', (param: any) => {
			this.$router.push({ name: param.type, params: { id: param.id } }).catch((err) => {});
		});

		// EventBus.$on('to-scroll', (now: number, next: number) => {
		// 	(this.$refs.childDiv as any).scrollTop = 0;
		// });
	}

	logout() {
		Api.logout(localStorage.getItem('accessToken'))
			.then((res) => {
				// 將 vuex 中的 token，設為空值
				this.setToken('');
				// 刪除 localStorage 中的 token
				localStorage.removeItem('accessToken');
				// 切換登入登出顯示
				this.showLogout = false;
				this.showLogin = true;
				// 跳轉 router 到登入頁面
				this.$router.push({ path: '/Login' });
			})
			.catch((err) => {});
	}
}
</script>
