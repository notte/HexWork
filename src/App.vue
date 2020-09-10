<template>
	<div id="app">
		<!-- header -->
		<div class="header">
			<div class="itemList">
				<router-link to="/" v-if="showLogin">
					<div class="logo">
						<img src="@/assets/logo.svg" alt />
					</div>
				</router-link>
				<div class="logo" v-if="showLogout">
					<img src="@/assets/logo.svg" alt />
				</div>
				<h3 v-if="showLogout">後台管理</h3>
				<div class="float_right">
					<router-link class="item" v-if="showLogin" to="/Product">產品列表</router-link>
					<el-tooltip
						:disabled="showCartQuantity"
						class="item"
						effect="dark"
						content="購物車沒有商品"
						placement="top-start"
					>
						<a v-if="showLogin" class="cart" @click="toCart">
							<p class="item">購物車</p>
							<el-badge :value="cartQuantity" v-if="cartQuantity !== 0" />
						</a>
					</el-tooltip>
					<a class="item" v-if="showLogout" @click="logout">登出</a>
				</div>
			</div>
		</div>
		<!-- router-view -->
		<div class="layout">
			<div class="container" ref="childDiv">
				<router-view />
				<div class="container-footer">
					<p>Copyright © 2020 Journey. Some Rights Reserved.</p>
					<router-link class="item" to="/Backoffice" v-if="showLogin">管理後台</router-link>
				</div>
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
import CartApi from '@/api/frontend/cart.ts';
import Login from './components/Backoffice/Login.vue';

const tokenModule = namespace('token');
const qs = require('qs');

@Component({
	components: {},
})
export default class App extends Vue {
	showCartQuantity: boolean = false;
	cartQuantity: number = 0;
	activeName: string = 'first';
	showLogin: boolean = false;
	showLogout: boolean = false;
	token: string | null = localStorage.getItem('accessToken');
	@Action('token/setToken') private setToken!: any;

	created() {
		this.checkShoppingCart();
		// 如果無法取得 token，顯示登入按鈕
		if (!localStorage.getItem('accessToken')) {
			this.showLogin = true;
			// 如果有取得 token，顯示登出按鈕並確認 token 是否過期
		} else {
			this.showLogout = true;
			this.checkToken(this.token);
		}
	}

	mounted() {
		EventBus.$on('set-tag', () => {
			this.showLogout = true;
			this.showLogin = false;
		});

		EventBus.$on('set-quantity', (quantity?: number) => {
			this.checkShoppingCart();
		});

		// 接收切換 router 及頁面的事件，打包參數一併傳遞
		EventBus.$on('open-type', (param: any) => {
			this.$router.push({ name: param.type, params: { id: param.id } }).catch((err) => {});
		});

		// EventBus.$on('to-scroll', (now: number, next: number) => {
		// 	(this.$refs.childDiv as any).scrollTop = 0;
		// });
	}

	checkShoppingCart() {
		CartApi.getCart().then((res) => {
			this.cartQuantity = res.data.length;
		});
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
				// 將 vuex 中的 token，設為空值
				this.setToken('');
				// 刪除 localStorage 中的 token
				localStorage.removeItem('accessToken');
			});
	}

	toCart() {
		if (this.cartQuantity !== 0) {
			this.$router.push({ path: '/Cart' });
		}
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
