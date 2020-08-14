<template>
	<div>
		<h1 class="CartTitle">購物車</h1>

		<el-steps :active="0" simple>
			<el-step title="訂單成立" icon="el-icon-s-order"></el-step>
			<el-step title="結帳付款" icon="el-icon-s-finance"></el-step>
			<el-step title="訂單完成" icon="el-icon-s-claim"></el-step>
		</el-steps>
		<!-- 購物車 -->
		<Cart />

		<!-- 成立訂單 -->
		<SetOrder />

		<!-- 結帳 -->
		<CheckOut />

		<!-- 結帳完畢 -->
		<Completed />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Cart from '@/components/Cart/Cart.vue';
import CheckOut from '@/components/Cart/CheckOut.vue';
import Completed from '@/components/Cart/Completed.vue';
import SetOrder from '@/components/Cart/SetOrder.vue';

@Component({
	components: { Cart, CheckOut, Completed, SetOrder },
})
export default class Foreign extends Vue {}
</script>
