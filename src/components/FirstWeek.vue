<template>
	<div>
		<div class="container">
			<h2>第一週：關注點分離</h2>
			<div class="item">
				<el-input v-model="task" placeholder="請輸入內容" />
				<el-button type="primary" @click="addTask">新增</el-button>
			</div>
			<el-table
				:data="tableData"
				empty-text="沒有資料"
				ref="multipleTable"
				@selection-change="handleSelectionChange"
			>
				<el-table-column width="50" type="selection" label-class-name="th"></el-table-column>
				<el-table-column label-class-name="th">
					<template slot-scope="scope">{{scope.row}}</template>
				</el-table-column>
				<el-table-column prop="delete" width="60" align="right" label-class-name="th">
					<template slot-scope="scope">
						<el-button icon="el-icon-delete" @click="deleteTask(scope.$index)" type="danger" circle />
					</template>
				</el-table-column>
			</el-table>
			<div class="item">
				<h3>還有 {{tableData.length}} 筆任務</h3>
				<el-button type="warning" @click="deleteSelectTask()" plain>清除選擇任務</el-button>
				<el-button type="danger" @click="deleteTaskList()" plain>清除所有任務</el-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class FirstWeek extends Vue {
	tableData: string[] = [];
	multipleSelection: string[] = [];
	task: string = '';

	addTask() {
		this.tableData.unshift(this.task);
		this.task = '';
	}

	deleteTask(index: number) {
		this.tableData.splice(index, 1);
	}

	deleteTaskList() {
		this.tableData = [];
	}

	deleteSelectTask(rows: undefined) {
		this.multipleSelection.forEach((item, index) => {
			for (const num in this.tableData) {
				if (this.tableData[num] === item) {
					this.tableData.splice(+num, 1);
				}
			}
		});
	}

	handleSelectionChange(value: string[]) {
		this.multipleSelection = value;
	}
}
</script>
