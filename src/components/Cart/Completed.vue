<template>
	<div>
		<div class="Completed">
			<h2>感謝您的訂購，歡迎您再次光臨</h2>
			<el-card class="box-card">
				<div class="item">
					<p>完成時間：</p>
					<p>{{orderTime}}</p>
				</div>
				<div class="item">
					<p>訂單編號：</p>
					<p>{{orderID}}</p>
				</div>
				<div class="item">
					<p>訂單金額：</p>
					<p>{{orderAmount}}</p>
				</div>
			</el-card>
			<router-link to="/">
				<el-button>繼續選購</el-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import EventBus from '@/utilities/event-bus';

@Component
export default class Completed extends Vue {
	orderID: string = '';
	orderTime: string = '';
	orderAmount: string = '';

	mounted() {
		EventBus.$on('send-order-info', (param: any) => {
			// console.log(param);
			this.orderID = param.id;
			this.orderTime = param.created;
			this.orderAmount = param.amount.toString();
		});
	}
}
</script>
