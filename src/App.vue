<template>
	<div id="app">
		<div class="container">
			<h2>第一週：關注點分離</h2>
			<div class="item">
				<el-input placeholder="請輸入內容" />
				<el-button type="primary">新增</el-button>
			</div>
			<el-table :data="tableData">
				<el-table-column width="40" label-class-name="th">
					<el-checkbox />
				</el-table-column>
				<el-table-column prop="date" label-class-name="th"></el-table-column>
				<el-table-column prop="delete" width="60" align="right" label-class-name="th">
					<el-button type="danger" icon="el-icon-delete" circle />
				</el-table-column>
			</el-table>
			<div class="item">
				<h3>還有 3 筆任務</h3>
				<el-button type="danger" plain>清除所有任務</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
	tableData: any[] = [];
	mounted() {
		this.tableData = [
			{
				date: '一一一一一一一一一一一一一一一一一',
				delete: '',
			},
		];
	}
}
</script>
