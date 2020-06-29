<template>
	<div id="app">
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
export default class App extends Vue {
	// List
	tableData: string[] = [];
	// 被選取中的 List
	multipleSelection: string[] = [];
	// 綁定 input 的 task
	task: string = '';

	// 新增任務
	addTask() {
		// 從陣列的前端加入，讓後來新增的任務保持最新
		this.tableData.unshift(this.task);
		// 加入後清空 input
		this.task = '';
	}

	// 單個刪除 task
	deleteTask(index: number) {
		this.tableData.splice(index, 1);
	}

	// 整個刪除 list，清空陣列
	deleteTaskList() {
		this.tableData = [];
	}

	// 刪除指定 task
	deleteSelectTask(rows: any) {
		// 迭代選取中的陣列
		this.multipleSelection.forEach((item, index) => {
			// 迭代目前的 List
			for (const num in this.tableData) {
				// 如果與 item 的內容相同，即刪除
				if (this.tableData[num] === item) {
					this.tableData.splice(+num, 1);
				}
			}
		});
	}

	// 偵測目前選取的 task，內容為 [task,task...]
	handleSelectionChange(value: string[]) {
		this.multipleSelection = value;
	}
}
</script>
