<template>
	<div>
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
export default class TravelList extends Vue {
	ProductList: Model.IProductList[] = [];
	isSea: boolean = false;
	isLand: boolean = false;
	isShopping: boolean = false;
	isHistory: boolean = false;
	price: string = '';

	// 發送事件
	checkStroke(id: string) {
		EventBus.getOpenType(Status.OpenType.TaiwanItem, id);
	}

	created() {
		this.getProductList();
	}

	getProductList() {
		Api.getProductList()
			.then(res => {
				this.ProductList = res.data;
				this.ProductList.forEach(element => {
					const newDate = element.category.split('、');
					let tag: string = '';
					newDate.forEach(item => {
						switch (item) {
							case '海上':
								tag = tag + `<span class="sea">海上</span>`;
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
					element.category = tag;
				});
			})
			.catch(err => {
				// console.log(err);
			});
	}
}
</script>
