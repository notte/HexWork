<template>
	<div>
		<div class="ThirdWeek">
			<el-button class="addButton" @click="dialogVisible = true">新增產品</el-button>
			<el-table :data="PageData[CurrentPage]" empty-text="無商品">
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
						<span :class="{ isTrue: scope.row.enabled }">{{ textType(scope.row.enabled) }}</span>
					</template>
				</el-table-column>
				<el-table-column label="編輯">
					<template slot-scope="scope">
						<el-button size="mini" @click="edit(scope.$index)">編輯</el-button>
						<el-button size="mini" type="danger" @click="dele(scope.row)">刪除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分頁 -->
			<el-pagination small layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="TotalPage"> </el-pagination>

			<!-- dialog -->
			<el-dialog :visible.sync="dialogVisible" width="50%" @close="handleClose">
				<div class="fromImage">
					<img :src="img1" alt />
				</div>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="圖片網址">
						<input v-model.lazy="img1" />
					</el-form-item>
					<el-form-item label="圖片網址">
						<input v-model.lazy="img2" />
					</el-form-item>
					<el-form-item label="圖片網址">
						<input v-model.lazy="img3" />
					</el-form-item>
					<el-form-item label="圖片網址">
						<input v-model.lazy="img4" />
					</el-form-item>
					<el-form-item label="圖片網址">
						<input v-model.lazy="img5" />
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
						<textarea type="textarea" v-model.lazy="form.description"></textarea>
					</el-form-item>
				</el-form>

				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" v-if="addHide" @click="add(form)">確定</el-button>
					<el-button type="primary" v-if="hide" @click="modify(form)">修改</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import axios, { AxiosRequestConfig } from 'axios';
import * as Modal from '@/models/interfaces/common';
import * as EventBus from '@/utilities/event-bus';
import { Loading } from 'element-ui';

@Component
export default class FifthWeek extends Vue {
	img1: string = '';
	img2: string = '';
	img3: string = '';
	img4: string = '';
	img5: string = '';
	uuid: string = '59677b21-aeb1-45eb-8ac8-9fe077baa5a0';
	token: string | null = '';
	config: AxiosRequestConfig = {};
	hide: boolean = false;
	addHide: boolean = true;
	dialogVisible: boolean = false;
	tableData: Modal.FourthWeek[] = [];
	PageData: object[] = [];
	TotalPage: number = 0;
	CurrentPage: number = 0;
	form: Modal.FourthWeek = {
		id: '',
		title: '',
		category: '',
		content: '',
		description: '',
		imageUrl: [],
		enabled: false,
		origin_price: 0,
		price: 0,
		unit: '',
	};

	created() {
		const loadingInstance = Loading.service({ fullscreen: true });
		this.token = localStorage.getItem('Token');

		this.config.headers = {
			Authorization: 'Bearer' + ' ' + this.token,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		};

		this.TableUpdate();
	}

	// 監聽事件
	@Watch('tableData')
	TotalePage() {
		const newData: any = [];

		this.tableData.forEach((item, i) => {
			if (i % 10 === 0) {
				newData.push([]);
			}
			const page = Math.floor(i / 10);
			newData[page].push(item);
		});

		this.PageData = newData;
		this.TotalPage = this.PageData.length;
	}

	// 頁碼跳轉
	handleCurrentChange(val: number) {
		this.CurrentPage = val - 1;
		EventBus.getScrollEvent(0, 0);
	}

	// GET 商品列表
	TableUpdate() {
		const loadingInstance = Loading.service({ fullscreen: true });
		axios
			.get('https://course-ec-api.hexschool.io/api/' + this.uuid + '/admin/ec/products', this.config)
			.then(res => {
				this.tableData = res.data.data;
				loadingInstance.close();
			})
			.catch(err => {});
	}

	// 新增商品
	add(form: Modal.FourthWeek) {
		form.imageUrl = [this.img1, this.img2, this.img3, this.img4, this.img5];
		axios
			.post('https://course-ec-api.hexschool.io/api/' + this.uuid + '/admin/ec/product', form, this.config)
			.then(res => {
				this.TableUpdate();
			})
			.catch(err => {});
		this.dialogVisible = false;
	}

	// 送出修改
	modify(form: Modal.FourthWeek) {
		axios
			.patch('https://course-ec-api.hexschool.io/api/' + this.uuid + '/admin/ec/product/' + form.id, form, this.config)
			.then(res => {})
			.catch(err => {});
		this.dialogVisible = false;
	}

	// 打開編輯商品
	edit(index: number) {
		this.dialogVisible = true;
		this.hide = true;
		this.addHide = false;
		this.form = this.tableData[index];
		[this.img1, this.img2, this.img3, this.img4, this.img5] = this.form.imageUrl;
	}

	// 刪除
	dele(row: Modal.FourthWeek) {
		const id = row.id;

		this.$confirm('確認刪除？')
			.then(_ => {
				axios
					.delete('https://course-ec-api.hexschool.io/api/' + this.uuid + '/admin/ec/product/' + id, this.config)
					.then(res => {
						this.TableUpdate();
					})
					.catch(err => {});
			})
			.catch(_ => {});
	}

	// 關閉 Modal 視窗，將資料歸零
	handleClose() {
		this.hide = false;
		this.addHide = true;
		this.form = {
			id: '',
			title: '',
			category: '',
			content: '',
			description: '',
			imageUrl: [],
			enabled: false,
			origin_price: 0,
			price: 0,
			unit: '',
		};
		this.img1 = '';
		this.img2 = '';
		this.img3 = '';
		this.img4 = '';
		this.img5 = '';
		this.dialogVisible = false;
	}

	// 識別開關，對應渲染CSS
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
.login {
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	top: 100px;
	width: 20%;
	padding: 30px;
	border-radius: 10px;
	box-shadow: 0px 6px 5px 0px #d5d5d554;
	border: 1px solid #d5d5d554;
	.el-input,
	.el-button {
		width: 100%;
		margin: 10px 0;
	}
}

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
.el-pagination {
	margin: 30px;
	text-align: center;
}

.el-table__row {
	td {
		padding: 30px 0;
	}
}
</style>
