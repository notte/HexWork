<template>
	<div class="CartMain">
		<h1 class="CartTitle">購物車</h1>

		<el-steps :active="steps" simple v-if="CurrentType !== 'CartList'">
			<el-step title="訂單成立" icon="el-icon-s-order"></el-step>
			<el-step title="結帳付款" icon="el-icon-s-finance"></el-step>
			<el-step title="訂單完成" icon="el-icon-s-claim"></el-step>
		</el-steps>
		<!-- 購物車 -->
		<Cart v-if="isShow('CartList')" />

		<!-- 成立訂單 -->
		<SetOrder v-if="isShow('SetOrder')" />

		<!-- 結帳 -->
		<CheckOut v-if="isShow('CheckOut')" />

		<!-- 結帳完畢 -->
		<Completed v-if="isShow('Completed')" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import Cart from '@/components/Cart/Cart.vue';
import CheckOut from '@/components/Cart/CheckOut.vue';
import Completed from '@/components/Cart/Completed.vue';
import SetOrder from '@/components/Cart/SetOrder.vue';
import * as Status from '@/models/status/type';
import EventBus from '@/utilities/event-bus';

@Component({
	components: { Cart, CheckOut, Completed, SetOrder },
})
export default class Foreign extends Vue {
	CurrentType: string = Status.OpenType.CartList;
	CartList: Status.OpenType.CartList = Status.OpenType.CartList;
	SetOrder: Status.OpenType.SetOrder = Status.OpenType.SetOrder;
	CheckOut: Status.OpenType.CheckOut = Status.OpenType.CheckOut;
	Completed: Status.OpenType.Completed = Status.OpenType.Completed;
	steps: number = 0;

	isShow(tab: Status.OpenType): boolean {
		return this.CurrentType === tab ? true : false;
	}

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
		EventBus.$on('open-type', (param: any) => {
			this.CurrentType = param.type;
		});
	}
}
</script>
