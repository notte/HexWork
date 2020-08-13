<template>
	<div>
		<h1 class="CartTitle">購物車</h1>
		<div class="CartLayout">
			<div class="Cart">
				<div class="Product">
					<div class="item flex-three image">
						<img src="~@/assets/taiwan/south/kaohsiung-2728058.jpg" alt />
					</div>
					<div class="item flex-three align-left"><h3>【大人囝仔】森林聚落／紫斑蝶季．霧中仙境</h3></div>
					<div class="item flex-two">
						<p>NT.10,000</p>
						<el-select v-model="value" placeholder="請選擇"> <el-option v-for="item in options" :key="item" :label="item" :value="item"> </el-option> </el-select>
						<p>人</p>
					</div>
					<div class="delete">
						<el-button type="danger" icon="el-icon-delete" plain circle></el-button>
					</div>
				</div>
				<div class="Product">
					<div class="item flex-three image">
						<img src="~@/assets/taiwan/south/kaohsiung-2728058.jpg" alt />
					</div>
					<div class="item flex-three align-left"><h3>【大人囝仔】森林聚落／紫斑蝶季．霧中仙境</h3></div>
					<div class="item flex-two">
						<p>NT.10,000</p>
						<el-select v-model="value" placeholder="請選擇"> <el-option v-for="item in options" :key="item" :label="item" :value="item"> </el-option> </el-select>
						<p>人</p>
					</div>
					<div class="delete">
						<el-button type="danger" icon="el-icon-delete" plain circle></el-button>
					</div>
				</div>
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
				<div class="total">
					<el-divider><h2>總計</h2></el-divider>
					<h1>$10,000,000</h1>
					<el-button @click="setOrder">下一步</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Foreign extends Vue {
	// 人數
	options: number[] = [1, 2, 3, 4, 5];
	// 選定購買人數
	value: number = 1;

	setOrder() {
		this.$router.push({ name: 'Order' });
	}
}
</script>
