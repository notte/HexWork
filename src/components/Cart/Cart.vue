<template>
	<div>
		<div class="CartLayout">
			<div class="Cart">
				<div class="Product" v-if="CartList.length == 0">
					<h3>無商品</h3>
				</div>
				<div class="Product" v-for="(item, index) in CartList" :key="index">
					<div class="item flex-three image">
						<img :src="item.product.imageUrl[1]" alt />
					</div>
					<div class="item flex-three align-left">
						<h3>{{ item.product.title }}</h3>
					</div>
					<div class="item flex-two">
						<p class="productTitle">${{ item.product.price | moneyFormat }}</p>
						<el-select v-model="item.quantity" @change="editItem(item.product.id, item.quantity)">
							<el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
						</el-select>
						<p>人</p>
					</div>
					<div class="delete">
						<el-button
							type="danger"
							icon="el-icon-delete"
							plain
							circle
							@click="deleteItem(item.product.id)"
						/>
					</div>
				</div>
				<div class="Coupons" v-if="CartList.length !== 0">
					<el-input type="text" v-model="couponsCode" placeholder="請輸入優惠券代碼"></el-input>
					<el-button @click="getCoupon(couponsCode)">兌換</el-button>
					<div v-if="isShowCoupon" class="CouponDelete">
						<h4>已使用優惠券：{{ Coupon }}</h4>
						<el-button size="mini" @click="deleCoupon">刪除</el-button>
					</div>
				</div>
			</div>
			<div class="Compute">
				<div class="itemList">
					<div class="item" v-for="(item, index) in CartList" :key="index">
						<p>{{ item.product.title }} x {{ item.quantity }}</p>
						<h3>${{ item.product.price | moneyFormat }}</h3>
					</div>
				</div>
				<div class="total">
					<el-divider>
						<h2>總計</h2>
					</el-divider>
					<h3 v-if="isShowCoupon">原價：${{ total | moneyFormat }}</h3>
					<h1 v-if="!isShowCoupon">${{ total | moneyFormat }}</h1>
					<h1 v-if="isShowCoupon">${{ discountTotal | moneyFormat }}</h1>
					<el-button v-if="CartList.length !== 0" @click="nextStep">下一步</el-button>
					<el-button v-if="CartList.length !== 0" class="major" @click="empty">清空購物車</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter, namespace } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import * as Model from '@/models/interfaces/frontend/cart';
import * as EventBus from '@/utilities/event-bus';
import * as Status from '@/models/status/type';
import Api from '@/api/frontend/cart.ts';
import { formatMixin } from '@/utilities/format';

const cartModule = namespace('cart');
const qs = require('qs');

@Component({ mixins: [formatMixin] })
export default class Cart extends Vue {
	CartList: Model.ICartData[] = [];
	CartListAndCoupon = {} as Model.ICartListAndCoupon;
	options: number[] = [1, 2, 3, 4, 5];
	total: string = '';
	couponsCode: string = '';
	Coupon: string = '';
	isShowCoupon: boolean = false;
	discount: number = 0;
	discountTotal: number = 0;
	@cartModule.State('CartList') cart!: string;
	@Action('cart/setCartList') private setCartList!: any;

	created() {
		this.getCart();
	}

	getCoupon(coupon: string) {
		EventBus.FullLoading(true);
		if (coupon !== '' && this.Coupon === '') {
			Api.getCoupon(coupon).then((res) => {
				this.couponsCode = '';
				this.Coupon = coupon;
				this.isShowCoupon = true;
				this.discount = res.data.percent / 100;
				this.discountTotal = +this.total * this.discount;
				this.CartListAndCoupon.coupon = coupon;
				this.CartListAndCoupon.discountTotal = this.discountTotal.toString();
				this.setCartList(this.CartListAndCoupon);
				EventBus.FullLoading(false);
			});
		} else if (this.Coupon !== '') {
			return '優惠券僅能使用乙張';
		} else if (coupon === '') {
			return '請輸入優惠券';
		}
	}

	deleCoupon() {
		this.isShowCoupon = false;
		this.Coupon = '';
		this.couponsCode = '';
	}

	getCart() {
		EventBus.FullLoading(true);
		Api.getCart().then((res) => {
			this.CartList = res.data;
			this.CartListAndCoupon.data = res.data;

			let total = 0;
			this.CartListAndCoupon.data.forEach((item) => {
				total = total + item.quantity * item.product.price;
			});

			this.total = total.toString();
			this.CartListAndCoupon.total = this.total;
			this.setCartList(this.CartListAndCoupon);

			EventBus.FullLoading(false);
		});
	}

	empty() {
		this.$confirm('確認清空購物車？')
			.then((_) => {
				EventBus.FullLoading(true);
				Api.emptyCart().then((res) => {
					this.getCart();
					EventBus.setCartQuantity();
					EventBus.FullLoading(false);
				});
			})
			.catch((err) => {});
	}

	editItem(id: string, quantity: number) {
		EventBus.FullLoading(true);
		const params: Model.IEditProductCartRequest = {
			product: id as string,
			quantity: quantity.toString(),
		};

		Api.editProduct(params).then((res) => {
			EventBus.FullLoading(false);
			this.getCart();
		});
	}

	deleteItem(id: string) {
		const params: Model.IDeleteProductCartRequest = {
			product: id as string,
		};
		this.$confirm('確認刪除？')
			.then((_) => {
				EventBus.FullLoading(true);
				Api.deleteProduct(id, params).then((res) => {
					this.getCart();
					EventBus.setCartQuantity();
				});
			})
			.catch((err) => {});
	}

	nextStep() {
		if (this.CartListAndCoupon.data.length !== 0) {
			EventBus.getOpenCartType(Status.OpenType.SetOrder);
		}
	}
}
</script>
