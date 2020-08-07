<template>
	<!-- 行程 -->
	<div class="stroke">
		<div class="title">
			<h1>【大人囝仔】森林聚落／紫斑蝶季．霧中仙境</h1>
			<div class="image">
				<img src="~@/assets/taiwan/south/kaohsiung-2728058.jpg" alt />
			</div>
			<h2>所有行程</h2>
			<div class="other-time">
				<el-table :data="tableData" :show-header="false">
					<el-table-column prop="date"></el-table-column>
					<el-table-column prop="name"></el-table-column>
					<el-table-column prop="number"></el-table-column>
					<el-table-column prop="address"></el-table-column>
					<el-table-column prop="buy">
						<el-button>報名</el-button>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="content">
			<div class="description">
				<div class="img">
					<img src="~@/assets/taiwan/south/the-urban-landscape-1698285-compressor.jpg" alt="" />
				</div>
				<h3>花蓮不再是後山，是片淨土。</h3>
				<h3>有多久沒有好好深呼吸了呢？ 來花蓮享受好山 好水，大口呼吸</h3>
				<h3>看看山、看看水、看看天空、看看海、看看風吹草動</h3>
				<h3>來花蓮走走吧❤️</h3>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
	components: {},
})
export default class Taipei extends Vue {
	// 錯誤訊息：This relative module was not found
	// 解法，路徑修改為 -> ~@/assets/taiwan/south/kaohsiung-2728058.jpg
	tableData: object[] = [
		{
			date: '出發日期',
			name: '星期幾',
			number: '可賣：1',
			address: '$10,000',
		},
		{
			date: '出發日期',
			name: '星期幾',
			number: '可賣：1',
			address: '$10,000',
		},
		{
			date: '出發日期',
			name: '星期幾',
			number: '可賣：1',
			address: '$10,000',
		},
	];
}
</script>
