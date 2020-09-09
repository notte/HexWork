<template>
	<div>
		<!-- 成立訂單 -->
		<div class="CartLayout">
			<div class="SetOrder">
				<el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
					<el-form-item label="姓名" prop="name" required>
						<el-input type="text" v-model.lazy="form.name"></el-input>
					</el-form-item>
					<el-form-item label="Email" prop="email" required>
						<el-input v-model="form.email"></el-input>
					</el-form-item>
					<el-form-item label="手機號碼" prop="tel" required>
						<el-input v-model="form.tel"></el-input>
					</el-form-item>
					<el-form-item label="地址" prop="address" required>
						<el-input v-model="form.address"></el-input>
					</el-form-item>
					<el-form-item label="優惠券" prop="address" required>
						<el-input v-model="form.coupon"></el-input>
					</el-form-item>
					<el-form-item label="付款方式" prop="payment" required>
						<el-select v-model="form.payment" placeholder="請選擇">
							<el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="備註">
						<el-input type="textarea" v-model="form.message"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button class="major" @click="submit('form')">送出訂單</el-button>
						<el-button @click="prevStep">返回</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="Compute">
				<div class="itemList">
					<div class="item" v-for="(item,index) in cart" :key="index">
						<p>{{item.product.title}} x {{item.quantity}}</p>
						<h3>${{item.product.price | moneyFormat}}</h3>
					</div>
				</div>
				<div class="total Order">
					<el-divider>
						<h2>總計</h2>
					</el-divider>
					<h1>${{total | moneyFormat}}</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { State, Action, Getter, namespace } from 'vuex-class';
import { formatMixin } from '@/utilities/format';
import Api from '@/api/frontend/cart.ts';
import * as EventBus from '@/utilities/event-bus';
import * as Status from '@/models/status/type';
import * as Model from '@/models/interfaces/frontend/cart';

const tokenModule = namespace('cart');
const qs = require('qs');

@Component({ mixins: [formatMixin] })
export default class SetOrder extends Vue {
	total: string = '';
	form: Model.ISetOrderUserForm = {
		name: '戴筱瑤',
		email: 'maonome@gmail.com',
		tel: '0956530329',
		address: '1212',
		payment: 'Credit',
		message: '',
		coupon: '',
	};
	options: string[] = ['Credit', 'ATM'];
	rules: object = {
		name: [
			{ required: true, message: '請輸入名稱', trigger: 'blur' },
			{ type: 'string', message: '請輸入正確的名稱', trigger: ['blur', 'change'] },
		],
		email: [
			{ required: true, message: '請輸入電子信箱', trigger: 'blur' },
			{ type: 'email', message: '請輸入正確的信箱', trigger: ['blur', 'change'] },
		],
		tel: [
			{ required: true, message: '請輸入手機號碼', trigger: 'blur' },
			{ pattern: /^09\d{8}$/, message: '請輸入正確的手機', trigger: ['blur', 'change'] },
		],
		address: [
			{ required: true, message: '請輸入地址', trigger: 'blur' },
			{ type: 'string', message: '請輸入正確的地址', trigger: ['blur', 'change'] },
		],
		payment: [{ required: true, message: '請選擇付款方式', trigger: 'blur' }],
	};

	@tokenModule.State('CartList') cart!: Model.ICartData[];
	@tokenModule.State('OrderInfo') orderInfo!: object;
	// @tokenModule.State('SetOrderForm') SetForm!: string;
	@Action('cart/SetOrderForm') private SetOrderForm!: any;
	@Action('cart/SetOrderInfo') private SetOrderInfo!: any;

	mounted() {
		let total = 0;
		this.cart.forEach((item) => {
			total = total + item.quantity * item.product.price;
		});
		this.total = total.toString();
	}

	submit(form: string) {
		(this.$refs[form] as HTMLFormElement).validate((valid: string) => {
			if (valid) {
				this.SetOrderForm(this.form);
				Api.setOrder(this.form)
					.then((res) => {
						const newOrderInfo: Model.ISetOrderInfo = { id: res.data.id, datetime: res.data.created.datetime, amount: res.data.amount };
						this.SetOrderInfo(newOrderInfo);
						EventBus.setCartQuantity(0);
					})
					.catch((err) => {});
				EventBus.getOpenType(Status.OpenType.CheckOut, this.form.payment);
			} else {
				return false;
			}
		});
	}

	prevStep() {
		this.$router.go(-1);
		EventBus.getOpenType(Status.OpenType.CartList);
	}
}
</script>
