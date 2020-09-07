<template>
	<div>
		<div class="CartLayout">
			<div class="Cart">
				<div class="Product" v-if="CartList.length == 0">
					<h3>無商品</h3>
				</div>
				<div class="Product" v-for="(item,index) in CartList" :key="index">
					<div class="item flex-three image">
						<img :src="item.product.imageUrl[1]" alt />
					</div>
					<div class="item flex-three align-left">
						<h3>{{item.product.title}}</h3>
					</div>
					<div class="item flex-two">
						<p class="productTitle">${{item.product.price | moneyFormat}}</p>
						<el-select v-model="item.quantity" @change="editItem(item.product.id,item.quantity)">
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
			</div>
			<div class="Compute">
				<div class="itemList">
					<div class="item" v-for="(item,index) in CartList" :key="index">
						<p>{{item.product.title}} x {{item.quantity}}</p>
						<h3>${{item.product.price | moneyFormat}}</h3>
					</div>
				</div>
				<div class="total">
					<el-divider>
						<h2>總計</h2>
					</el-divider>
					<h1>${{total | moneyFormat}}</h1>
					<el-button @click="nextStep">下一步</el-button>
					<el-button class="major" @click="empty">清空購物車</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Api from '@/api/frontend/cart.ts';
import * as Model from '@/models/interfaces/frontend/cart';
import * as EventBus from '@/utilities/event-bus';
import * as Status from '@/models/status/type';
import { State, Action, Getter, namespace } from 'vuex-class';
import { formatMixin } from '@/utilities/format';

const tokenModule = namespace('cart');
const qs = require('qs');

@Component({ mixins: [formatMixin] })
export default class Cart extends Vue {
	CartList: Model.ICartData[] = [];
	// 人數
	options: number[] = [1, 2, 3, 4, 5];
	total: string = '';
	// 映射 state
	@tokenModule.State('CartList') cart!: string;
	@Action('cart/setCartList') private setCartList!: any;

	created() {
		this.getCart();
	}

	beforeUpdate() {
		let total = 0;
		this.CartList.forEach((item) => {
			total = total + item.quantity * item.product.price;
		});
		this.total = total.toString();
	}

	// 獲取購物車
	getCart() {
		Api.getCart()
			.then((res) => {
				this.CartList = res.data;
				this.setCartList(this.CartList);
			})
			.catch((err) => {});
	}

	// 清空購物車
	empty() {
		Api.emptyCart()
			.then((res) => {
				this.getCart();
				EventBus.setCartQuantity();
			})
			.catch((err) => {});
	}

	// 更新購物車
	editItem(id: string, quantity: number) {
		const params: Model.IEditProductCartRequest = {
			product: id as string,
			quantity: quantity.toString(),
		};

		Api.editProduct(params)
			.then((res) => {
				this.getCart();
			})
			.catch((err) => {});
	}
	// 刪除一品項
	deleteItem(id: string) {
		const params: Model.IDeleteProductCartRequest = {
			product: id as string,
		};
		Api.deleteProduct(id, params)
			.then((res) => {
				this.getCart();
				EventBus.setCartQuantity();
			})
			.catch((err) => {});
	}

	// 下一步
	nextStep() {
		EventBus.getOpenType(Status.OpenType.SetOrder);
	}
}
</script>
