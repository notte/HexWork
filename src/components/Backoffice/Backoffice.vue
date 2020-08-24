<template>
	<div class="Backoffice">
		<el-tabs v-model="activeName">
			<el-tab-pane label="產品列表" name="1">
				產品列表
				<!-- <ProductList /> -->
			</el-tab-pane>
			<el-tab-pane label="優惠券" name="2">
				優惠券
				<!-- <Coupon /> -->
			</el-tab-pane>
			<el-tab-pane label="訂單列表" name="3"
				>訂單列表
				<!-- <OrderList /> -->
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ProductList from '@/components/Backoffice/ProductList.vue';
import Coupon from '@/components/Backoffice/Coupon.vue';
import OrderList from '@/components/Backoffice/OrderList.vue';

@Component({
	components: { ProductList, Coupon, OrderList },
})
export default class Backoffice extends Vue {
	activeName: string = '1';
	// @tab-click="handleClick"
	// handleClick(tab: any, event: any) {
	// 	console.log(tab, event);
	// }
}
</script>
