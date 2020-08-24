<template>
	<div>
		<el-row class="TaiwanMain">
			<el-col v-for="(item, index) in ProductList" :key="index">
				<el-card shadow="hover">
					<div class="item-image">
						<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
					</div>
					<div class="item">
						<div class="tag">
							<span class="sea">海上</span>
							<span class="land">陸上</span>
							<span class="shopping">購物</span>
							<span class="history">歷史</span>
						</div>
						<h3>{{ item.title }}</h3>
						<div class="money">
							<h1>${{ item.price }}</h1>
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
import Api from '@/api/front-end.ts';
import * as Model from '@/models/interfaces/front-end';

@Component({})
export default class TaiwanMain extends Vue {
	ProductList: Model.IProductList[] = [];
	isSea: boolean = false;
	isLand: boolean = false;
	isShopping: boolean = false;
	isHistory: boolean = false;
	// 發送事件
	checkStroke(id: string) {
		// console.log(id);
		// EventBus.getOpenType(Status.OpenType.TaiwanItem);
	}

	created() {
		this.getProductList();
	}

	getProductList() {
		Api.getProductList()
			.then(res => {
				this.ProductList = res.data;
				this.ProductList.forEach(item => {
					const category = item.category.split('、');
					category.forEach(item => {
						// switch (item) {
						// 	case '水上':
						// 		this.isSea = true;
						// 		break;
						// 	case '陸上':
						// 		this.isLand = true;
						// 		break;
						// 	case '購物':
						// 		this.isShopping = true;
						// 		break;
						// 	case '歷史':
						// 		this.isHistory = true;
						// 		break;
						// 	default:
						// 		break;
						// }
					});
				});
			})
			.catch(err => {
				// console.log(err);
			});
	}

	mounted() {}
}
</script>
