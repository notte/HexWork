<template>
	<div>
		<div class="Completed">
			<h2>感謝您的訂購，歡迎您再次光臨</h2>
			<el-card class="box-card">
				<div class="item">
					<p>完成時間：{{orderCreated}}</p>
				</div>
				<div class="item">
					<p>訂單編號：{{orderID | captureOrderID}}</p>
				</div>
				<div class="item">
					<p>訂單金額：${{orderAmount | moneyFormat}}</p>
				</div>
			</el-card>
			<div class="Coupons" v-if="isShowCoupon">
				<h3>贈送折扣碼：{{ couponCode }}</h3>
			</div>
			<router-link to="/Product">
				<el-button>繼續選購</el-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter, namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import * as Model from '@/models/interfaces/frontend/cart';
import EventBus from '@/utilities/event-bus';
import { formatMixin } from '@/utilities/format';

const tokenModule = namespace('cart');
const qs = require('qs');

@Component({ mixins: [formatMixin] })
export default class Completed extends Vue {
	// 是否顯示優惠券（結帳金額是否有達到）
	isShowCoupon: boolean = false;
	// 要顯示的優惠券碼
	couponCode: string = '';
	orderID: string = '';
	orderCreated: string = '';
	orderAmount: string = '';
	@tokenModule.State('OrderInfo') OrderInfo!: Model.ISetOrderInfo;

	mounted() {
		this.orderID = this.OrderInfo.id;
		this.orderCreated = this.OrderInfo.datetime;
		this.orderAmount = this.OrderInfo.amount.toString();

		// 判斷顯示哪個優惠券碼
		const money = +this.orderAmount;

		if (money > 20000) {
			this.isShowCoupon = true;
			this.couponCode = 'COUPON_TWO';
		} else if (money > 10000) {
			this.isShowCoupon = true;
			this.couponCode = 'COUPON_ONE';
		}
	}
}
</script>
