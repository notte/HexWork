<template>
	<div>
		<!-- 成立訂單 -->
		<div class="CartLayout">
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
						<el-button class="major">送出訂單</el-button>
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
					<el-divider>
						<h2>總計</h2>
					</el-divider>
					<h1>$10,000,000</h1>
				</div>
			</div>
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
