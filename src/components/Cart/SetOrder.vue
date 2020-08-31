<template>
	<div>
		<!-- 成立訂單 -->
		<div class="CartLayout">
			<div class="SetOrder">
				<el-form ref="form" :model="form" label-width="80px" label-position="top">
					<el-form-item label="姓名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="身分證字號">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="Email">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="手機號碼">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="護照姓名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="備註">
						<el-input type="textarea" v-model="form.desc"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button class="major" @click="nextStep">送出訂單</el-button>
						<el-button>返回</el-button>
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
import * as Model from '@/models/interfaces/frontend/cart';
import { formatMixin } from '@/utilities/format';
import * as EventBus from '@/utilities/event-bus';
import * as Status from '@/models/status/type';

const tokenModule = namespace('cart');
const qs = require('qs');
@Component({ mixins: [formatMixin] })
export default class SetOrder extends Vue {
	total: string = '';
	form: object = {
		name: '',
		region: '',
		date1: '',
		date2: '',
		delivery: false,
		type: [],
		resource: '',
		desc: '',
	};
	@tokenModule.State('CartList') cart!: Model.ICartData[];

	mounted() {
		let total = 0;
		this.cart.forEach((item) => {
			total = total + item.quantity * item.product.price;
		});
		this.total = total.toString();
	}

	nextStep() {
		EventBus.getOpenType(Status.OpenType.CheckOut);
	}
}
</script>
