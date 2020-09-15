<template>
	<div>
		<div class="CheckOut">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>結帳資訊</span>
				</div>
				<div class="item">
					<p>姓名：</p>
					<p>{{ SetForm.name }}</p>
				</div>
				<div class="item">
					<p>手機號碼：</p>
					<p>{{ SetForm.tel }}</p>
				</div>
				<div class="item">
					<p>Email：</p>
					<p>{{ SetForm.email }}</p>
				</div>
				<div class="item">
					<p>付款方式：</p>
					<p>{{ SetForm.payment }}</p>
				</div>
				<div class="item">
					<p>地址：</p>
					<p>{{ SetForm.address }}</p>
				</div>
				<div class="item">
					<p>備註：</p>
					<p>{{ SetForm.message }}</p>
				</div>
			</el-card>
			<el-card class="box-card orderInfo">
				<div slot="header" class="clearfix">
					<span>訂單資訊</span>
				</div>
				<div class="item">
					<p>訂單成立時間：</p>
					<p>{{ orderCreated }}</p>
				</div>
				<div class="item">
					<p>訂單編號：</p>
					<p>{{ orderID | captureOrderID }}</p>
				</div>
				<div class="item">
					<p>總金額：</p>
					<p>${{ orderAmount | moneyFormat }}</p>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>結帳資訊</span>
				</div>
				<h3 v-if="Payment == 'ATM'">前往 ATM 繳款</h3>
				<el-form v-if="Payment == 'Credit'" ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
					<el-form-item label="信用卡卡號" prop="card" required>
						<el-input maxlength="16" v-model.number.lazy="form.card"></el-input>
					</el-form-item>
					<el-form-item label="有效期限" prop="date" required>
						<el-date-picker v-model="form.date" type="month" placeholder="有效期限"></el-date-picker>
					</el-form-item>
					<el-form-item label="背後末三碼" prop="code" required>
						<el-input maxlength="3" v-model.number="form.code"></el-input>
					</el-form-item>
				</el-form>
			</el-card>
			<div class="item button">
				<el-button class="major" v-if="Payment == 'ATM'" @click="CheckOut(orderID)">結帳</el-button>
				<el-button class="major" v-if="Payment == 'Credit'" @click="CheckOut(orderID, 'form')">結帳</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter, namespace } from 'vuex-class';
import { Component, Prop } from 'vue-property-decorator';
import * as Model from '@/models/interfaces/frontend/cart';
import * as Status from '@/models/status/type';
import EventBus from '@/utilities/event-bus';
import Api from '@/api/frontend/cart.ts';
import { formatMixin } from '@/utilities/format';

const cartModule = namespace('cart');
const qs = require('qs');

@Component({ mixins: [formatMixin] })
export default class CheckOut extends Vue {
	// 取得付款方式
	@Prop(String) Payment!: string;
	orderID: string = '';
	orderCreated: string = '';
	orderAmount: string = '';
	form: object = {
		card: '1232123212321232',
		date: '',
		code: '123',
	};
	rules: object = {
		card: [
			{ required: true, message: '請輸入信用卡卡號', trigger: 'blur' },
			{ type: 'number', message: '請輸入正確的信用卡卡號', trigger: ['blur', 'change'] },
		],
		date: [
			{ required: true, message: '請輸入有效期限', trigger: 'blur' },
			{ type: 'date', message: '請輸入正確的有效期限', trigger: ['blur', 'change'] },
		],
		code: [
			{ required: true, message: '請輸入背後末三碼', trigger: 'blur' },
			{ type: 'number', length: 3, message: '請輸入正確的背後末三碼', trigger: ['blur', 'change'] },
		],
	};
	@cartModule.State('SetOrderForm') SetForm!: string;
	@cartModule.State('CartList') cart!: string;
	@cartModule.State('OrderInfo') OrderInfo!: Model.ISetOrderInfo;

	mounted() {
		this.orderID = this.OrderInfo.id;
		this.orderCreated = this.OrderInfo.datetime;
		this.orderAmount = this.OrderInfo.amount.toString();
	}

	// 	結帳
	CheckOut(id: string, form?: string) {
		// 如果付款方式為 Credit，需要驗證 form 表單
		if (form) {
			(this.$refs[form] as HTMLFormElement).validate((valid: string) => {
				if (valid) {
					Api.checkOut(id).then(res => {
						// 跳轉顯示 type
						EventBus.$emit('open-type', { type: Status.OpenType.Completed });
					});
				} else {
					return false;
				}
			});
		} else {
			// 不需要驗證表單
			Api.checkOut(id).then(res => {
				// 跳轉顯示 type
				EventBus.$emit('open-type', { type: Status.OpenType.Completed });
			});
		}
	}
}
</script>
