<template>
	<div>
		<h1 class="CartTitle">訂單成立</h1>

		<el-steps :active="0" simple>
			<el-step title="訂單成立" icon="el-icon-s-order"></el-step>
			<el-step title="結帳付款" icon="el-icon-s-finance"></el-step>
			<el-step title="訂單完成" icon="el-icon-s-claim"></el-step>
		</el-steps>

		<!-- 成立訂單 -->
		<!-- <div class="CartLayout">
			<div class="SetOrder">
				<el-form ref="form" :model="form" label-width="80px" label-position="top">
					<el-form-item label="姓名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="身分證字號">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="Email">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="手機號碼">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="護照姓名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="備註">
						<el-input type="textarea" v-model="form.desc"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">送出訂單</el-button>
						<el-button>返回</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="Compute">
				<div class="itemList">
					<div class="item">
						<p>【大人囝仔】森林聚落／紫斑蝶季．霧中仙境 x1</p>
						<h3>NT.10,000</h3>
					</div>
					<div class="item">
						<p>【大人囝仔】森林聚落／紫斑蝶季．霧中仙境 x1</p>
						<h3>NT.10,000</h3>
					</div>
				</div>
				<div class="total Order">
					<el-divider><h2>總計</h2></el-divider>
					<h1>$10,000,000</h1>
				</div>
			</div>
		</div> -->
		<!-- 結帳付款 -->
		<div class="Checkout">
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
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class SetOrder extends Vue {
	form: object = {
		name: '',
		region: '',
		date1: '',
		date2: '',
		delivery: false,
		type: [],
		resource: '',
		desc: '',
	};
}
</script>
