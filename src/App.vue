<template>
	<div id="app" v-loading.fullscreen.lock="fullscreenLoading">
		<div class="header">
			<div class="itemList">
				<router-link to="/">
					<div class="logo">
						<img src="@/assets/logo.svg" alt />
					</div>
				</router-link>
				<h3 v-if="$route.name == 'Backoffice'">後台管理</h3>
				<div class="float_right">
					<router-link class="item" to="/Product">產品列表</router-link>
					<el-tooltip :disabled="showCartQuantity" class="item" effect="dark" content="購物車沒有商品" placement="top-start">
						<a class="cart" @click="toCart">
							<p class="item">購物車</p>
							<el-badge :value="cartQuantity" v-if="cartQuantity !== 0" />
						</a>
					</el-tooltip>
					<a class="item" v-if="showLogout" @click="logout">登出</a>
				</div>
			</div>
		</div>
		<div class="layout">
			<div class="container" ref="childDiv">
				<router-view />
				<div class="container-footer">
					<p>Copyright © 2020 Journey. Some Rights Reserved.</p>
					<router-link class="item" to="/Backoffice" v-if="showLogin">登入後台</router-link>
					<router-link class="item" to="/Backoffice" v-if="showLogout">管理後台</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Model } from 'vue-property-decorator';
import { State, Action, Getter, namespace } from 'vuex-class';
import { IError, IErrorData } from '@/models/interfaces/common';
import Login from './components/Backoffice/Login.vue';
import EventBus from '@/utilities/event-bus';
import CartApi from '@/api/frontend/cart.ts';
import Api from '@/api/common.ts';

const tokenModule = namespace('token');
const qs = require('qs');

@Component
export default class App extends Vue {
	// 判斷是否出線"購物車沒有商品"
	showCartQuantity: boolean = false;
	// 目前購物車數量，為 0 時不顯示，並且不跳轉 router
	cartQuantity: number = 0;
	// 判斷登入按鈕是否顯示
	showLogin: boolean = false;
	// 判斷登出按鈕是否出現
	showLogout: boolean = false;
	// vuex 中的 token
	token: string | null = localStorage.getItem('accessToken');
	// 判斷 loading 顯示關閉
	fullscreenLoading: boolean = false;
	// vuex 中 set token 的方法
	@Action('token/setToken') private setToken!: any;
	@Action('stroke/setStrokeList') private setStroke!: any;

	created() {
		// 先確認目前購物車是否有商品
		this.checkShoppingCart();
		// 如果無法取得 token，顯示登入按鈕
		if (!localStorage.getItem('accessToken')) {
			this.showLogin = true;
		} else {
			// 如果有取得 token，顯示登出按鈕並確認 token 是否過期
			this.showLogout = true;
			this.checkToken(this.token);
		}
	}

	mounted() {
		EventBus.$on('get-stroke', (StrokeList: any) => {
			this.setStroke(StrokeList.StrokeList);
		});
		// 接收登入登出按鈕顯示狀態
		EventBus.$on('set-tag', () => {
			this.showLogout = true;
			this.showLogin = false;
		});

		// 接收購物車數量改變
		EventBus.$on('set-quantity', (quantity?: number) => {
			this.checkShoppingCart();
		});

		// 接收捲軸置頂事件
		EventBus.$on('to-scroll', () => {
			(this.$refs.childDiv as any).scrollTop = 0;
		});

		// 接收 Loading 顯示事件
		EventBus.$on('full-loading', (param: { type: boolean }) => {
			this.fullscreenLoading = param.type;
		});

		// 接收操作反饋
		EventBus.$on('system-alert', (item: any) => {
			this.$notify({
				title: item.type,
				message: item.message,
				position: 'bottom-left',
				showClose: false,
				duration: 5000,
				iconClass: 'el-icon-coffee-cup',
				customClass: 'alertItem_error',
			});
		});

		// 接收 api 錯誤
		EventBus.$on('api-error', (err: any) => {
			this.$notify({
				title: err.code,
				message: err.message,
				position: 'bottom-left',
				showClose: false,
				duration: 5000,
				iconClass: 'el-icon-lightning',
				customClass: 'alertItem_error',
			});
		});
	}

	// 確認購物車數量
	checkShoppingCart() {
		CartApi.getCart().then(res => {
			// 設定購物車數量（長度）
			this.cartQuantity = res.data.length;
			// 是否顯示"購物車當前沒有商品"
			this.showCartQuantity = this.cartQuantity === 0 ? false : true;
		});
	}

	// 確認 token(登入狀態)，可能有 token、或者沒有就為 null
	checkToken(check: string | null) {
		Api.check(check)
			.then(res => {
				// 確認有 token 並且沒過期，修改登入登出按鈕顯示狀態
				this.showLogout = true;
				this.showLogin = false;
			})
			.catch(err => {
				// 沒有token 且 token 過期，修改登入登出按鈕顯示狀態
				this.showLogout = false;
				this.showLogin = true;
				// 將 vuex 中的 token，設為空值
				this.setToken('');
				// 刪除 localStorage 中的 token
				localStorage.removeItem('accessToken');
			});
	}

	// 跳轉到購物車
	toCart() {
		// 如果購物車數量不為 0 ，且當前 router 位置不在購物車
		if (this.cartQuantity !== 0 && this.$route.name !== 'Cart') {
			// 跳轉 router 到購物車
			this.$router.push({ path: '/Cart' });
		}
	}

	// 登出
	logout() {
		EventBus.$emit('full-loading', {
			type: true,
		});
		// 從 localStorage 的 token 登出
		Api.logout(localStorage.getItem('accessToken')).then(res => {
			// 將 vuex 中的 token，設為空值
			this.setToken('');
			// 刪除 localStorage 中的 token
			localStorage.removeItem('accessToken');
			// 切換登入登出顯示
			this.showLogout = false;
			this.showLogin = true;
			// 跳轉 router 回到登入頁面

			EventBus.$emit('full-loading', {
				type: false,
			});
			this.$router.push({ path: '/Login' });
			this.$notify({
				title: '登出成功',
				message: '',
				position: 'bottom-left',
				showClose: false,
				duration: 5000,
				iconClass: 'el-icon-ice-cream',
				customClass: 'alertItem_info',
			});
		});
	}
}
</script>
