<template>
	<!-- 單一行程內容 -->
	<div class="Stroke">
		<div class="title">
			<h1 class>{{ productItem.title }}</h1>
			<div class="image">
				<img :src="img1" alt />
			</div>
		</div>
		<!-- 內容區塊 -->
		<div class="content">
			<!-- 宣傳內容 -->
			<div class="Propaganda">
				<h1>{{ productItem.description }}{{ strokeTitle }}</h1>
				<div class="text">
					<div class="img">
						<img :src="img2" />
					</div>
					<p>{{ strokeContentOne }}</p>
				</div>
				<div class="text">
					<div class="img">
						<img :src="img3" />
					</div>
					<p>{{ strokeContentTWO }}</p>
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
import { Component, Watch, Prop } from 'vue-property-decorator';
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
	@Prop(String) readonly productId!: string;
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
	@strokeModule.State('ItineraryArticle') ItineraryArticle!: any;

	created() {
		this.getProduct(this.productId);
	}

	// 取得單一產品
	getProduct(id: string) {
		Api.getProductItem(id).then(res => {
			this.productItem = res.data;
			this.img1 = this.productItem.imageUrl[0];
			this.img2 = this.productItem.imageUrl[1];
			this.img3 = this.productItem.imageUrl[2];
			this.price = this.productItem.price.toString();
		});
	}

	@Watch('productItem')
	changeContent() {
		const tag = this.productItem.category.split('、');
		tag.forEach((item,i) => {
			switch (item) {
				case '陸上':
					if (this.strokeTitle === '') {
						this.strokeTitle = this.ItineraryArticle.land.title;
					}
					switch (i) {
						case 0:
							this.strokeContentOne = this.ItineraryArticle.land.content[i];
							break;
						case 1:
							this.strokeContentTWO = this.ItineraryArticle.land.content[i];
							break;
						default:
							break;
					}
					break;
				case '水上':
					if (this.strokeTitle === '') {
						this.strokeTitle = this.ItineraryArticle.sea.title;
					}
					switch (i) {
						case 0:
							this.strokeContentOne = this.ItineraryArticle.sea.content[i];
							break;
						case 1:
							this.strokeContentTWO = this.ItineraryArticle.sea.content[i];
							break;
						default:
							break;
					}
					break;
				case '購物':
					if (this.strokeTitle === '') {
						this.strokeTitle = this.ItineraryArticle.shopping.title;
					}
					switch (i) {
						case 0:
							this.strokeContentOne = this.ItineraryArticle.shopping.content[i];
							break;
						case 1:
							this.strokeContentTWO = this.ItineraryArticle.shopping.content[i];
							break;
						default:
							break;
					}
					break;
				case '歷史':
					if (this.strokeTitle === '') {
						this.strokeTitle = this.ItineraryArticle.history.title;
					}
					switch (i) {
						case 0:
							this.strokeContentOne = this.ItineraryArticle.history.content[i];
							break;
						case 1:
							this.strokeContentTWO = this.ItineraryArticle.history.content[i];
							break;
						default:
							break;
					}
					break;
				default:
					break;
			}

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
