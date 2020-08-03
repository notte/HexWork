<template>
	<div class="ThirdWeek">
		<el-button class="addButton" @click="dialogVisible = true">新增產品</el-button>
		<el-table :data="tableData">
			<el-table-column label="分類" prop="category" />
			<el-table-column label="產品名稱" prop="title" />
			<el-table-column label="原價" prop="origin_price" />
			<el-table-column label="售價" prop="price" />
			<el-table-column label="是否啟用">
				<template slot-scope="scope">
					<span>{{ scope.row.enabled }}</span>
				</template>
			</el-table-column>
			<el-table-column label="編輯">
				<template slot-scope="scope">
					<el-button size="mini" @click="edit(scope.$index)">編輯</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">刪除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- dialog -->
		<el-dialog :title="form.title==''? '新增產品':'編輯產品'" :visible.sync="dialogVisible" width="30%">
			<div class="fromImage">
				<img :src="form.imageUrl" alt />
			</div>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="圖片網址">
					<el-input v-model="form.imageUrl"></el-input>
				</el-form-item>
				<el-form-item label="分類">
					<el-input v-model="form.category"></el-input>
				</el-form-item>
				<el-form-item label="單位">
					<el-input v-model="form.unit"></el-input>
				</el-form-item>
				<el-form-item label="產品名稱">
					<el-input v-model="form.title" />
				</el-form-item>
				<el-form-item label="原價">
					<el-input type="number" v-model="form.origin_price" />
				</el-form-item>
				<el-form-item label="售價">
					<el-input type="number" v-model="form.price" />
				</el-form-item>
				<el-form-item label="是否啟用">
					<el-switch v-model="form.enabled"></el-switch>
				</el-form-item>
				<el-form-item label="產品描述">
					<el-input type="textarea" v-model="form.content"></el-input>
				</el-form-item>
				<el-form-item label="說明內容">
					<el-input type="textarea" v-model="form.description"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="add(form)">確定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as Modal from '@/models/interfaces/common';

@Component
export default class ThirdWeek extends Vue {
	dialogVisible: boolean = false;
	tableData: Modal.ThirdWeek[] = [
		{
			title: 'PS5 Wifi',
			category: '主機',
			content: '次世代超強規格',
			description: '我也想要換一台 PS5 Wifi',
			imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
			enabled: false,
			origin_price: 29999,
			price: 9487,
			unit: '',
		},
	];
	form: Modal.ThirdWeek = {
		title: '',
		category: '',
		content: '',
		description: '',
		imageUrl: '',
		enabled: false,
		origin_price: 0,
		price: 0,
		unit: '',
	};
	initialForm: Modal.ThirdWeek = {
		title: '',
		category: '',
		content: '',
		description: '',
		imageUrl: '',
		enabled: false,
		origin_price: 0,
		price: 0,
		unit: '',
	};

	add(form: Modal.ThirdWeek) {
		for (let item in this.tableData) {
			if (this.tableData[item].title !== form.title) {
				this.tableData.push(form);
			} else {
				this.tableData[item] = form;
			}
		}
		this.form = this.initialForm;
		this.dialogVisible = false;
	}

	edit(index: number) {
		this.dialogVisible = true;
		this.form = this.tableData[index];
	}
}
</script>

<style lang="scss">
.addButton {
	margin-bottom: 30px;
}

.fromImage {
	margin-bottom: 20px;
	width: 100%;
	overflow: hidden;
	img {
		width: 100%;
		position: relative;
	}
}
</style>