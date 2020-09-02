<template>
	<div>
		<div class="CheckOut">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>結帳資訊</span>
				</div>
				<div class="item">
					<p>姓名：</p>
					<p>{{SetForm.name}}</p>
				</div>
				<div class="item">
					<p>手機號碼：</p>
					<p>{{SetForm.tel}}</p>
				</div>
				<div class="item">
					<p>Email：</p>
					<p>{{SetForm.email}}</p>
				</div>
				<div class="item">
					<p>付款方式：</p>
					<p>{{SetForm.payment}}</p>
				</div>
				<div class="item">
					<p>地址：</p>
					<p>{{SetForm.address}}</p>
				</div>
				<div class="item">
					<p>備註：</p>
					<p>{{SetForm.message}}</p>
				</div>
			</el-card>
			<el-card class="box-card orderInfo">
				<div slot="header" class="clearfix">
					<span>訂單資訊</span>
				</div>
				<div class="item">
					<p>訂單成立時間：</p>
					<p>{{orderCreated}}</p>
				</div>
				<div class="item">
					<p>訂單編號：</p>
					<p>{{orderID}}</p>
				</div>
				<div class="item">
					<p>總金額：</p>
					<p>${{orderAmount | moneyFormat}}</p>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>結帳資訊</span>
				</div>
				<div class="item">
					<p>信用卡卡號：</p>
					<el-input />
				</div>
				<div class="item">
					<p>有效期限：</p>
					<el-input />
				</div>
				<div class="item">
					<p>背後末三碼：</p>
					<el-input />
				</div>
			</el-card>
			<div class="item button">
				<el-button class="major" @click="CheckOut(orderID)">結帳</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { State, Action, Getter, namespace } from 'vuex-class';
import EventBus from '@/utilities/event-bus';
import { formatMixin } from '@/utilities/format';
import * as Status from '@/models/status/type';
import Api from '@/api/frontend/cart.ts';

const tokenModule = namespace('cart');
const qs = require('qs');

@Component({ mixins: [formatMixin] })
export default class CheckOut extends Vue {
	orderID: string = '';
	orderCreated: string = '';
	orderAmount: string = '';
	@tokenModule.State('SetOrderForm') SetForm!: string;
	@tokenModule.State('CartList') cart!: string;

	mounted() {
		EventBus.$on('send-order-info', (param: any) => {
			this.orderID = param.id;
			this.orderCreated = param.created;
			this.orderAmount = param.amount.toString();
		});
	}

	CheckOut(id: string) {
		Api.checkOut(id)
			.then((res) => {
				const datetime = res.data.updated.datetime;
				const amount = res.data.amount;
				EventBus.$emit('send-order-info', { id, datetime, amount });
				EventBus.$emit('open-type', { type: Status.OpenType.Completed });
			})
			.catch((err) => {});
	}
}
</script>
