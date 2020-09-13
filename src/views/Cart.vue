<template>
	<div class="CartMain">
		<h1 class="CartTitle">購物車</h1>

		<el-steps :active="steps" simple v-if="CurrentType !== 'CartList'">
			<el-step title="訂單成立" icon="el-icon-s-order"></el-step>
			<el-step title="結帳付款" icon="el-icon-s-finance"></el-step>
			<el-step title="訂單完成" icon="el-icon-s-claim"></el-step>
		</el-steps>
		<Cart v-if="isShow('CartList')" />
		<SetOrder v-if="isShow('SetOrder')" />
		<CheckOut v-if="isShow('CheckOut')" :Payment="Payment" />
		<Completed v-if="isShow('Completed')" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import Completed from '@/components/Cart/Completed.vue';
import CheckOut from '@/components/Cart/CheckOut.vue';
import SetOrder from '@/components/Cart/SetOrder.vue';
import Cart from '@/components/Cart/Cart.vue';
import * as Status from '@/models/status/type';
import EventBus from '@/utilities/event-bus';

@Component({
	components: { Cart, CheckOut, Completed, SetOrder },
})
export default class Foreign extends Vue {
	// 目前顯示頁面
	CurrentType: string = Status.OpenType.CartList;
	CartList: Status.OpenType.CartList = Status.OpenType.CartList;
	SetOrder: Status.OpenType.SetOrder = Status.OpenType.SetOrder;
	CheckOut: Status.OpenType.CheckOut = Status.OpenType.CheckOut;
	Completed: Status.OpenType.Completed = Status.OpenType.Completed;
	// 記錄付款方式
	Payment: string = '';
	// 記錄目前結帳步驟
	steps: number = 0;

	// 判斷顯示
	isShow(tab: Status.OpenType): boolean {
		return this.CurrentType === tab ? true : false;
	}

	// 監聽目前顯示的位置，調整結帳階段
	@Watch('CurrentType')
	changeStep() {
		switch (this.CurrentType) {
			case 'SetOrder':
				this.steps = 1;
				break;
			case 'CheckOut':
				this.steps = 2;
				break;
			case 'Completed':
				this.steps = 3;
				break;

			default:
				break;
		}
	}

	mounted() {
		// 接收修改顯示頁面
		EventBus.$on('open-type', (param: { type: string; id: string }) => {
			this.CurrentType = param.type;
			this.Payment = param.id;
		});
	}
}
</script>
