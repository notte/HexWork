<template>
	<div class="ThirdWeek">
		<el-button class="addButton" @click="dialogVisible = true">新增產品</el-button>
		<el-table :data="tableData" empty-text="無商品">
			<el-table-column label="分類">
				<template slot-scope="scope">
					<span>{{ scope.row.category }}</span>
				</template>
			</el-table-column>

			<el-table-column label="產品名稱">
				<template slot-scope="scope">
					<span>{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<el-table-column label="原價">
				<template slot-scope="scope">
					<span>{{ scope.row.origin_price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="售價">
				<template slot-scope="scope">
					<span>{{ scope.row.price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="是否啟用">
				<template slot-scope="scope">
					<span :class="{'isTrue':scope.row.enabled}">{{ textType(scope.row.enabled) }}</span>
				</template>
			</el-table-column>
			<el-table-column label="編輯">
				<template slot-scope="scope">
					<el-button size="mini" @click="edit(scope.$index)">編輯</el-button>
					<el-button size="mini" type="danger" @click="dele(scope.$index)">刪除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- dialog -->
		<el-dialog :visible.sync="dialogVisible" width="50%" @close="handleClose">
			<div class="fromImage">
				<img :src="form.imageUrl" alt />
			</div>
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="圖片網址">
					<input v-model.lazy="form.imageUrl" />
				</el-form-item>
				<el-form-item label="分類">
					<input v-model.lazy="form.category" />
				</el-form-item>
				<el-form-item label="單位">
					<input v-model.lazy="form.unit" />
				</el-form-item>
				<el-form-item label="產品名稱">
					<input v-model.lazy="form.title" />
				</el-form-item>
				<el-form-item label="原價">
					<input v-model.number.lazy="form.origin_price" />
				</el-form-item>
				<el-form-item label="售價">
					<input v-model.number.lazy="form.price" />
				</el-form-item>
				<el-form-item label="是否啟用">
					<el-switch v-model="form.enabled" active-text="啟用" inactive-text="不啟用"></el-switch>
				</el-form-item>
				<el-form-item label="產品描述">
					<textarea type="textarea" v-model.lazy="form.content" />
				</el-form-item>
				<el-form-item label="說明內容">
					<textarea type="textarea" v-model.lazy="form.description" />
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" v-if="addHide" @click="add(form)">確定</el-button>
				<el-button type="primary" v-if="hide" @click="modify(form)">修改</el-button>
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
	hide: boolean = false;
	addHide: boolean = true;
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

	add(form: Modal.ThirdWeek) {
		this.tableData.push(form);
		this.dialogVisible = false;
	}

	modify(form: Modal.ThirdWeek) {
		for (const item in this.tableData) {
			if (this.tableData[item].title === form.title) {
				this.tableData[item] = form;
			}
		}
		this.dialogVisible = false;
	}

	edit(index: number) {
		this.dialogVisible = true;
		this.hide = true;
		this.addHide = false;
		this.form = this.tableData[index];
	}

	handleClose() {
		this.hide = false;
		this.addHide = true;
		this.form = {
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
		this.dialogVisible = false;
	}

	dele(index: number) {
		this.$confirm('確認刪除？')
			.then((_) => {
				this.tableData.splice(index, 1);
			})
			.catch((_) => {});
	}

	textType(text: boolean) {
		if (text === false) {
			return '未啟用';
		} else {
			return '啟用';
		}
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

.el-dialog__body {
	.el-form-item {
		width: 45%;
		display: inline-block;
	}
	.el-form-item:nth-child(8),
	.el-form-item:nth-child(9) {
		width: 90%;
		textarea {
			width: 100%;
		}
	}
}
input,
textarea {
	-webkit-appearance: none;
	background-color: #fff;
	background-image: none;
	border-radius: 4px;
	border: 1px solid #dcdfe6;
	box-sizing: border-box;
	color: #606266;
	display: inline-block;
	font-size: inherit;
	height: 40px;
	line-height: 40px;
	outline: 0;
	padding: 0 15px;
	transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
	width: 100%;
}
textarea {
	height: 60px;
}
.isTrue {
	color: #0a9c11;
}
</style>