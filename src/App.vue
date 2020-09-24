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
					<el-tooltip
						:disabled="showCartQuantity"
						class="item"
						effect="dark"
						content="購物車沒有商品"
						placement="top-start"
					>
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
import travelContent from '@/assets/travelContent.ts';
import Login from './components/Backoffice/Login.vue';
import EventBus from '@/utilities/event-bus';
import CartApi from '@/api/frontend/cart.ts';
import Api from '@/api/common.ts';

const tokenModule = namespace('token');
const qs = require('qs');

@Component
export default class App extends Vue {
	showCartQuantity: boolean = false;
	cartQuantity: number = 0;
	showLogin: boolean = false;
	showLogout: boolean = false;
	token: string | null = localStorage.getItem('accessToken');
	fullscreenLoading: boolean = false;
	@Action('token/setToken') private setToken!: any;
	@Action('stroke/setStrokeList') private setStroke!: any;

	created() {
		this.setStroke(travelContent);
		this.checkShoppingCart();
		if (!localStorage.getItem('accessToken')) {
			this.showLogin = true;
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

		EventBus.$on('to-scroll', () => {
			(this.$refs.childDiv as any).scrollTop = 0;
		});

		EventBus.$on('full-loading', (param: { type: boolean }) => {
			this.fullscreenLoading = param.type;
		});

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

	checkShoppingCart() {
		CartApi.getCart().then((res) => {
			this.cartQuantity = res.data.length;
			this.showCartQuantity = this.cartQuantity === 0 ? false : true;
		});
	}

	checkToken(check: string | null) {
		Api.check(check)
			.then((res) => {
				this.showLogout = true;
				this.showLogin = false;
			})
			.catch((err) => {
				this.showLogout = false;
				this.showLogin = true;
				this.setToken('');
				localStorage.removeItem('accessToken');
			});
	}

	toCart() {
		if (this.cartQuantity !== 0 && this.$route.name !== 'Cart') {
			this.$router.push({ path: '/Cart' });
		}
	}

	logout() {
		EventBus.$emit('full-loading', {
			type: true,
		});
		Api.logout(localStorage.getItem('accessToken')).then((res) => {
			this.setToken('');
			localStorage.removeItem('accessToken');
			this.showLogout = false;
			this.showLogin = true;

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
