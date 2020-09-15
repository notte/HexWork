<template>
	<div class="Stroke">
		<div class="title">
			<h1 class>{{ productItem.title }}</h1>
			<div class="image">
				<img :src="img1" alt />
			</div>
		</div>
		<div class="content">
			<div class="Propaganda">
				<h1>{{ productItem.description }}{{ strokeTitle }}</h1>
				<div class="text">
					<div class="img">
						<img :src="img2" alt />
					</div>
					<p>
						{{ strokeContentOne }}
					</p>
				</div>
				<div class="text">
					<div class="img">
						<img :src="img3" alt />
					</div>
					<p>
						{{ strokeContentTWO }}
					</p>
				</div>
			</div>
			<div class="stroke">
				<h3>行程預定</h3>
				<h4>{{ productItem.content | timeFormat }}</h4>
				<p>{{ productItem.title }}</p>
				<div class="addCart">
					<h1>${{ productItem.price | moneyFormat }}</h1>
					<el-select v-model="value" placeholder="請選擇">
						<el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
					</el-select>
					<h3>/人</h3>
				</div>
			</div>
			<el-button class="major" @click="addCart">立即報名</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { State, Action, Getter, namespace } from 'vuex-class';
import Api from '@/api/frontend/product.ts';
import * as Model from '@/models/interfaces/frontend/product';
import * as EventBus from '@/utilities/event-bus';
import { formatMixin } from '@/utilities/format';

const strokeModule = namespace('stroke');
const qs = require('qs');

@Component({ mixins: [formatMixin] })
export default class Location extends Vue {
	// 從 URL 取得產品 id，用 split 改為陣列格式
	productId: string[] | string = location.hash.split('#/');
	productItem = {} as Model.IData;
	// 圖片位址
	img1: string = '';
	img2: string = '';
	img3: string = '';
	// 金額
	price: string = '';
	options: number[] = [1, 2, 3, 4, 5];
	value: number = 1;
	// 行程標題
	strokeTitle: string = '';
	// 行程內文一
	strokeContentOne: string = '';
	// 行程內文二
	strokeContentTWO: string = '';
	@strokeModule.State('StrokeList') StrokeList!: any;

	created() {
		// 設定 id
		this.productId = this.productId[1];
		this.getProductItem(this.productId);
	}

	@Watch('productItem')
	changeContent() {
		// console.log(this.StrokeList);
		const tag = this.productItem.category.split('、');
		tag.forEach((item, i) => {
			switch (item) {
				case '陸上':
					if (this.strokeTitle === '') {
						this.strokeTitle = this.StrokeList.land.title;
					}
					this.strokeContentOne = this.StrokeList.land.content[0];
					this.strokeContentTWO = this.StrokeList.land.content[1];
					break;
				case '水上':
					if (this.strokeTitle === '') {
						this.strokeTitle = this.StrokeList.sea.title;
					}
					this.strokeContentOne = this.StrokeList.sea.content[0];
					this.strokeContentTWO = this.StrokeList.sea.content[1];
					break;
				case '購物':
					if (this.strokeTitle === '') {
						this.strokeTitle = this.StrokeList.shopping.title;
					}
					this.strokeContentOne = this.StrokeList.shopping.content[0];
					break;
				case '歷史':
					if (this.strokeTitle === '') {
						this.strokeTitle = this.StrokeList.history.title;
					}
					this.strokeContentOne = this.StrokeList.history.content[0];
					break;
				default:
					break;
					if (this.strokeContentTWO === '' && item === '陸上') {
						this.strokeContentTWO = this.StrokeList.land.content[1];
					}
			}
		});
	}

	// 取得單一產品
	getProductItem(id: string) {
		EventBus.FullLoading(true);
		Api.getProductItem(id).then(res => {
			this.productItem = res.data;
			this.img1 = this.productItem.imageUrl[0];
			this.img2 = this.productItem.imageUrl[1];
			this.img3 = this.productItem.imageUrl[2];
			this.price = this.productItem.price.toString();
			EventBus.getScrollEvent();
			EventBus.FullLoading(false);
		});
	}

	// 新增購物車
	addCart() {
		EventBus.FullLoading(true);
		const params: Model.IAddProductCartRequest = {
			product: this.productId as string,
			quantity: this.value.toString(),
		};
		// 發送購物車事件
		Api.addProductCart(params).then(res => {
			EventBus.setCartQuantity();
			EventBus.FullLoading(false);
		});
	}

	// 計算屬性示例
	// <h1>${{setPrice}}</h1>
	// get setPrice(): string {
	// 	return getMoney(this.price);
	// }
	// set setPrice(value:number){
	// 	return this.price = value;
	// }
}
</script>
