<template>
	<!-- 行程 -->
	<div class="Stroke">
		<div class="title">
			<h1 class>{{ productItem.title }}</h1>
			<div class="image">
				<img :src="img1" alt />
			</div>
		</div>
		<div class="content">
			<!-- 行程文宣 -->
			<div class="Propaganda">
				<h1>花蓮的山海，自由自在無拘無束</h1>
				<div class="text">
					<h3>世界遺產潛力點►太魯閣國家公園</h3>
					<div class="img">
						<img :src="img2" alt />
					</div>
					<p>
						太魯閣峽谷是台灣島上具有世界級水準的地理景觀。峽谷沿立霧溪而行長達數十公里，觸目所及皆是壁立千仞的峭壁、斷崖、峽谷，連綿曲折的山洞隧道、大理岩層和溪流等風光，歷經立霧溪沖刷重量、風化侵蝕和地殼上升的變動，才成就了太魯閣雄偉壯闊的峽谷景觀，遊客無不讚嘆造物者之鬼斧神工。如今我們在太魯閣峭壁看到的裸露岩層，擁有6500萬年的歷史，在台灣這座僅約600萬年歲的年輕島嶼，居然藏著如此古老靈魂。尤以天祥至太魯閣口一段最為壯觀，也是主要的旅遊據點，由於地理景觀獨特，內政部於民國75年設立了「太魯閣國家公園」，成為我國第四座國家公園。
					</p>
				</div>
				<div class="text">
					<h3>世界遺產潛力點►太魯閣國家公園</h3>
					<div class="img">
						<img :src="img3" alt />
					</div>
					<p>
						太魯閣峽谷是台灣島上具有世界級水準的地理景觀。峽谷沿立霧溪而行長達數十公里，觸目所及皆是壁立千仞的峭壁、斷崖、峽谷，連綿曲折的山洞隧道、大理岩層和溪流等風光，歷經立霧溪沖刷重量、風化侵蝕和地殼上升的變動，才成就了太魯閣雄偉壯闊的峽谷景觀，遊客無不讚嘆造物者之鬼斧神工。如今我們在太魯閣峭壁看到的裸露岩層，擁有6500萬年的歷史，在台灣這座僅約600萬年歲的年輕島嶼，居然藏著如此古老靈魂。尤以天祥至太魯閣口一段最為壯觀，也是主要的旅遊據點，由於地理景觀獨特，內政部於民國75年設立了「太魯閣國家公園」，成為我國第四座國家公園。
					</p>
				</div>
			</div>
			<div class="stroke">
				<h3>預定行程</h3>
				<p>{{ productItem.title }}</p>
				<div class="addCart">
					<!-- 計算屬性示例 -->
					<!-- <h1>${{setPrice}}</h1> -->
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
import { Component } from 'vue-property-decorator';
import Api from '@/api/frontend/product.ts';
import * as Model from '@/models/interfaces/frontend/product';
import { formatMixin } from '@/utilities/format';
import * as EventBus from '@/utilities/event-bus';

@Component({ mixins: [formatMixin] })
export default class Location extends Vue {
	productId: string[] | string = location.hash.split('#/');
	productItem = {} as Model.IData;
	// 圖片位址
	img1: string = '';
	img2: string = '';
	img3: string = '';
	// 金額
	price: string = '';
	// 錯誤訊息：This relative module was not found
	// 解法，圖片路徑修改為 -> ~@/assets/taiwan/south/02.jpg

	// 人數
	options: number[] = [1, 2, 3, 4, 5];
	// 選定購買人數
	value: number = 1;

	created() {
		this.productId = this.productId[1];
		this.getProductItem(this.productId);
	}

	getProductItem(id: string) {
		Api.getProductItem(id).then(res => {
			this.productItem = res.data;
			this.img1 = this.productItem.imageUrl[0];
			this.img2 = this.productItem.imageUrl[1];
			this.img3 = this.productItem.imageUrl[2];
			this.price = this.productItem.price.toString();
		});
	}

	addCart() {
		const params: Model.IAddProductCartRequest = {
			product: this.productId as string,
			quantity: this.value.toString(),
		};

		Api.addProductCart(params).then(res => {
			EventBus.setCartQuantity();
		});
	}

	// 計算屬性
	// get setPrice(): string {
	// 	return getMoney(this.price);
	// }
	// set setPrice(value:number){
	// 	return this.price = value;
	// }
}
</script>
