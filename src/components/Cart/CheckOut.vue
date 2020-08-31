<template>
	<div>
		<div class="CheckOut">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>結帳資訊</span>
				</div>
				<div class="item">
					<p>姓名：</p>
				</div>
				<div class="item">
					<p>身分證號碼：</p>
				</div>
				<div class="item">
					<p>Email：</p>
				</div>
				<div class="item">
					<p>護照姓名：</p>
				</div>
				<div class="item">
					<p>手機號碼：</p>
				</div>
				<div class="item">
					<p>地址：</p>
				</div>
				<div class="item">
					<p>備註：</p>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>訂單資訊</span>
				</div>
				<div class="item">
					<p>訂單成立時間：</p>
				</div>
				<div class="item">
					<p>訂單編號：</p>
				</div>
				<div class="item">
					<p>總金額：</p>
				</div>
			</el-card>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>結帳資訊</span>
				</div>
				<div class="item">
					<p>信用卡卡號：</p>
					<el-input />
				</div>
				<div class="item">
					<p>有效期限：</p>
					<el-input />
				</div>
				<div class="item">
					<p>背後末三碼：</p>
					<el-input />
				</div>
			</el-card>
			<div class="item button">
				<el-button class="major" @click="nextStep">結帳</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as EventBus from '@/utilities/event-bus';
import * as Status from '@/models/status/type';

@Component
export default class CheckOut extends Vue {
	// 下一步
	nextStep() {
		EventBus.getOpenType(Status.OpenType.Completed);
	}
}
</script>
