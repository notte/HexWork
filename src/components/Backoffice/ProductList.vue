<template>
	<div>
		<el-button
			class="addButton"
			@click="
				dialogVisible = true;
				submitButton = true;
			"
			>新增產品
		</el-button>
		<el-table empty-text="無商品" :data="PageData[CurrentPage]">
			<el-table-column label="行程分類">
				<template slot-scope="scope">
					<span>{{ scope.row.category }}</span>
				</template>
			</el-table-column>

			<el-table-column label="行程標題">
				<template slot-scope="scope">
					<span>{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<el-table-column label="出團時間">
				<template slot-scope="scope">
					<span>{{ scope.row.origin_price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="售價">
				<template slot-scope="scope">
					<span>{{ scope.row.price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="是否成團">
				<template slot-scope="scope">
					<span>{{ scope.row.enabled }}</span>
				</template>
			</el-table-column>
			<el-table-column label="編輯">
				<template slot-scope="scope">
					<el-button size="mini" @click="edit(scope.row)">編輯</el-button>
					<el-button size="mini" class="major" @click="clearItem(scope.row.id)">刪除</el-button></template
				>
			</el-table-column>
		</el-table>
		<!-- 分頁 -->
		<el-pagination small layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="TotalPage" />

		<!-- dialog -->
		<el-dialog :visible.sync="dialogVisible" @close="handleClose">
			<div class="fromImage">
				<h2>圖片預覽</h2>
				<div class="ImageItem">
					<img :src="img1" alt />
				</div>
				<div class="ImageItem">
					<img :src="img2" alt />
				</div>
				<div class="ImageItem">
					<img :src="img3" alt />
				</div>
				<div class="ImageItem">
					<img :src="img4" alt />
				</div>
				<div class="ImageItem">
					<img :src="img5" alt />
				</div>
			</div>
			<el-form ref="form" :model="form">
				<el-form-item label="主題圖">
					<input v-model.lazy="img1" />
				</el-form-item>
				<el-form-item label="行程圖">
					<input v-model.lazy="img2" />
				</el-form-item>
				<el-form-item label="行程圖">
					<input v-model.lazy="img3" />
				</el-form-item>
				<el-form-item label="行程圖">
					<input v-model.lazy="img4" />
				</el-form-item>
				<el-form-item label="行程圖">
					<input v-model.lazy="img5" />
				</el-form-item>
				<el-form-item label="行程標題">
					<input v-model.lazy="form.title" />
				</el-form-item>
				<el-form-item label="出發日期">
					<el-date-picker value-format="timestamp" type="date" v-model.number.lazy="startDate" />
				</el-form-item>
				<el-form-item label="回來日期">
					<el-date-picker value-format="timestamp" type="date" v-model.number.lazy="endDate" />
				</el-form-item>
				<el-form-item label="行程分類">
					<input v-model.lazy="form.category" />
				</el-form-item>
				<el-form-item label="總人數">
					<input v-model.lazy="form.content" />
				</el-form-item>
				<el-form-item label="已售">
					<input v-model.lazy="form.unit" />
				</el-form-item>
				<el-form-item label="售價">
					<input v-model.number.lazy="form.price" />
				</el-form-item>
				<el-form-item label="是否成團">
					<el-switch v-model="form.enabled" active-text="啟用" inactive-text="不啟用"></el-switch>
				</el-form-item>
				<el-form-item label="地點">
					<input v-model.lazy="form.description" />
				</el-form-item>

				<div class="footer">
					<span slot="footer" class="dialog-footer">
						<el-button class="cancel" @click="sum(startDate, endDate)">計算</el-button>
						<el-button class="cancel" @click="dialogVisible = false">取消</el-button>
						<el-button @click="submit(form)" v-if="submitButton">確定</el-button>
						<el-button @click="modify(form)" v-if="modifyButton">修改</el-button>
					</span>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import Api from '@/api/productList.ts';
import * as Model from '@/models/interfaces/ProductList';

@Component
export default class ProductList extends Vue {
	dialogVisible: boolean = false;
	// 未排頁面資料
	ProductList: Model.IProductList[] = [];
	// 已排頁面資料
	PageData: object = {};
	// 選中的頁數
	CurrentPage: number = 0;
	// 總頁數
	TotalPage: number = 0;
	// 圖片網址陣列
	img1: string = '';
	img2: string = '';
	img3: string = '';
	img4: string = '';
	img5: string = '';
	// 控制發送按鈕顯示
	submitButton: boolean = false;
	// 控制修改按鈕顯示
	modifyButton: boolean = false;
	// 出發回來日期
	startDate: Date = new Date();
	endDate: Date = new Date();

	sum(start: number, end: number) {
		console.log(end - start);
	}

	// 表單
	form: Model.IProductItem = {
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
		this.getProductList();
	}

	// 取得產品列表
	getProductList() {
		Api.getBackofficeProductList()
			.then(res => {
				this.ProductList = res.data;
			})
			.catch(err => {
				// console.log(err);
			});
	}

	// 監聽是否有重新獲取商品列表
	@Watch('ProductList')
	TotalePage() {
		const newData: any = [];
		this.ProductList.forEach((item, i) => {
			if (i % 10 === 0) {
				newData.push([]);
			}
			const page = Math.floor(i / 10);
			newData[page].push(item);
		});

		this.TotalPage = newData.length;
		this.PageData = newData;
	}

	// 換頁
	handleCurrentChange(val: number) {
		this.CurrentPage = val - 1;
	}

	// 編輯，打開單一商品
	edit(row: Model.IProductItem) {
		this.dialogVisible = true;
		this.modifyButton = true;
		this.form = row;
		[this.img1, this.img2, this.img3, this.img4, this.img5] = this.form.imageUrl;
	}

	// 刪除單一品項
	clearItem(id: string) {
		this.$confirm('確認刪除？')
			.then(_ => {
				Api.deleteProduct(id).then(res => {
					this.getProductList();
				});
			})
			.catch(_ => {});
	}

	// 新增商品
	submit(form: Model.IProductItem) {
		this.form.imageUrl = [this.img1, this.img2, this.img3, this.img4, this.img5];
		Api.addProductItem(form)
			.then(res => {
				this.dialogVisible = false;
				this.getProductList();
			})
			.catch(err => {
				// console.log(err);
			});
	}

	modify(form: Model.IProductItem) {
		this.form.imageUrl = [this.img1, this.img2, this.img3, this.img4, this.img5];
		Api.modifyProductItem(form, form.id)
			.then(res => {
				this.dialogVisible = false;
				this.getProductList();
			})
			.catch(err => {
				// console.log(err);
			});
	}

	// 關閉 Modal 視窗，將資料歸零
	handleClose() {
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
		this.modifyButton = false;
		this.submitButton = false;
		this.dialogVisible = false;
	}
}
</script>
