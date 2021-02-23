<template>
	<div class="Product">
		<!-- 迭代所有旅行行程（產品） -->
		<el-row class="TravelList">
			<el-col v-for="(item, index) in ProductList" :key="index">
				<el-card shadow="hover">
					<div class="item-image">
						<img :src="item.imageUrl[1]" />
					</div>
					<div class="item">
						<div class="tag" v-html="item.category"></div>
						<p>{{ item.content | timeFormat }}</p>
						<h3>{{ item.title }}</h3>
						<div class="money">
							<h1>${{ item.price | moneyFormat }}</h1>
							<el-button @click="checkStroke(item.id)">看看行程</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as EventBus from '@/utilities/event-bus';
import * as Status from '@/models/status/type';
import Api from '@/api/frontend/product.ts';
import * as Model from '@/models/interfaces/frontend/product';
import { formatMixin } from '@/utilities/format';

@Component({ mixins: [formatMixin] })
export default class Product extends Vue {
	ProductList: Model.IProductList[] = [];
	isSea: boolean = false;
	isLand: boolean = false;
	isShopping: boolean = false;
	isHistory: boolean = false;
	price: string = '';

	created() {
		this.getProductList();
	}

	checkStroke(id: string) {
		EventBus.getOpenProductType(Status.OpenType.Location,id);
		EventBus.getScrollEvent();
	}

	getProductList() {
		EventBus.FullLoading(true);
		Api.getProductList().then(res => {
			// 取得產品列表
			this.ProductList = res.data;
			// 迭代產品列表
			this.ProductList.forEach(element => {
				// 將每一個產品的分類，宣告為陣列
				const newData = element.category.split('、');
				let tag: string = '';
				// 迭代每一產品的所有分類
				newData.forEach(item => {
					// return tag 的 html 標籤
					switch (item) {
						case '水上':
							tag = tag + `<span class="sea">水上</span>`;
							break;
						case '陸上':
							tag = tag + `<span class="land">陸上</span>`;
							break;
						case '歷史':
							tag = tag + `<span class="history">歷史</span>`;
							break;
						case '購物':
							tag = tag + `<span class="shopping">購物</span>`;
							break;
						default:
							break;
					}
					return tag;
				});
				// 綁定在 v-html
				element.category = tag;
				EventBus.FullLoading(false);
			});
		});
	}
}
</script>
