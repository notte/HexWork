<template>
	<div>
		<el-button class="addButton" @click="addButton">新增產品</el-button>

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
			<el-table-column label="已賣名額">
				<template slot-scope="scope">
					<span>{{ scope.row.origin_price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="售價">
				<template slot-scope="scope">
					<span>${{ scope.row.price | moneyFormat }}</span>
				</template>
			</el-table-column>
			<el-table-column label="是否滿員">
				<template slot-scope="scope">
					<span>{{ scope.row.enabled | setMemberFull }}</span>
				</template>
			</el-table-column>
			<el-table-column label="編輯">
				<template slot-scope="scope">
					<el-button size="mini" @click="edit(scope.row)">編輯</el-button>
					<el-button size="mini" class="major" @click="clearItem(scope.row.id)">刪除</el-button>
				</template>
			</el-table-column>
		</el-table>

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
					<el-input v-model.lazy="img1" />
				</el-form-item>
				<el-form-item label="行程圖">
					<el-input v-model.lazy="img2" />
				</el-form-item>
				<el-form-item label="行程圖">
					<el-input v-model.lazy="img3" />
				</el-form-item>
				<el-form-item label="行程圖">
					<el-input v-model.lazy="img4" />
				</el-form-item>
				<el-form-item label="行程圖">
					<el-input v-model.lazy="img5" />
				</el-form-item>
				<el-form-item label="行程標題">
					<el-input v-model.lazy="form.title" />
				</el-form-item>
				<el-form-item label="出發日期">
					<el-date-picker value-format="yyyy-MM-dd" v-model.lazy="startDate" />
				</el-form-item>
				<el-form-item label="回來日期">
					<el-date-picker value-format="yyyy-MM-dd" v-model.lazy="endDate" />
				</el-form-item>
				<el-form-item label="行程分類">
					<el-input v-model.lazy="form.category" />
				</el-form-item>
				<el-form-item label="總人數">
					<el-input v-model.lazy="form.unit" />
				</el-form-item>
				<el-form-item label="地點">
					<el-input v-model.lazy="form.description" />
				</el-form-item>
				<el-form-item label="已售人數">
					<el-input v-model.number.lazy="form.origin_price" />
				</el-form-item>
				<el-form-item label="售價">
					<el-input v-model.number.lazy="form.price" />
				</el-form-item>
				<el-form-item label="是否滿員">
					<el-switch v-model="form.enabled" active-text="未滿員" inactive-text="滿員"></el-switch>
				</el-form-item>

				<div class="footer">
					<span slot="footer" class="dialog-footer">
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
import { State, Action, Getter, namespace } from 'vuex-class';
import Api from '@/api/backoffice/product.ts';
import OrderApi from '@/api/backoffice/order.ts';
import * as Model from '@/models/interfaces/backoffice/product';
import * as Status from '@/models/status/type';
import * as EventBus from '@/utilities/event-bus';
import { formatMixin } from '@/utilities/format';

const tokenModule = namespace('order');
const qs = require('qs');

@Component({ mixins: [formatMixin] })
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
	startDate: string = '';
	endDate: string = '';
	soldList: any[] = [];
	selectRow = {} as Model.IProductItem;
	@tokenModule.State('OrderList') OrderList!: string[];

	// 表單
	form: Model.IProductItem = {
		// 自動生成
		id: '',
		// 行程名稱
		title: '',
		// 行程類型
		category: '',
		// 出團時間
		content: '',
		// 行程地點
		description: '',
		imageUrl: [],
		// 是否滿員，false 為未滿 / true 為滿員
		enabled: false,
		// 已賣名額
		origin_price: 0,
		// 價格
		price: 0,
		// 總名額
		unit: '',
	};

	created() {
		// 從訂單列表迭代每一筆訂單
		this.OrderList.forEach((element: any) => {
			element.products.forEach((item: any) => {
				this.soldList = this.soldList.concat([item]);
			});
		});
		this.getProductList();
	}

	addButton() {
		this.dialogVisible = true;
		this.submitButton = true;
	}

	// 取得產品列表
	getProductList() {
		EventBus.FullLoading(true);
		Api.getBackofficeProductList().then(res => {
			this.ProductList = res.data;
			EventBus.FullLoading(false);
		});
	}

	// 監聽是否有重新獲取商品列表
	@Watch('ProductList')
	TotalePage() {
		const newData: any = [];
		this.ProductList.forEach((item, i) => {
			for (const order of this.soldList) {
				if (order.product.title === item.title) {
					item.origin_price = item.origin_price + order.quantity;
				}
			}

			if (+item.unit - item.origin_price === 0) {
				item.enabled = false;
			}

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
		EventBus.FullLoading(true);
		this.dialogVisible = true;
		this.modifyButton = true;

		this.selectRow = { ...row };

		Api.getProductItem(row.id).then(res => {
			this.form.enabled = row.enabled;
			this.form = this.selectRow;
			this.form.description = res.data.description;
			[this.img1, this.img2, this.img3, this.img4, this.img5] = this.form.imageUrl;
			const timeArray = this.form.content.split('~');
			this.startDate = timeArray[0];
			this.endDate = timeArray[1];

			EventBus.FullLoading(false);
		});
	}

	// 刪除單一品項
	clearItem(id: string) {
		this.$confirm('確認刪除？')
			.then(_ => {
				EventBus.FullLoading(true);
				Api.deleteProduct(id).then(res => {
					this.getProductList();

					EventBus.FullLoading(false);
					EventBus.SystemAlert(Status.SysMessageType.Information, '刪除成功');
				});
			})
			.catch(err => {});
	}

	// 新增商品
	submit(form: Model.IProductItem) {
		EventBus.FullLoading(true);
		this.form.imageUrl = [this.img1, this.img2, this.img3, this.img4, this.img5];
		this.form.content = this.startDate + '~' + this.endDate;
		this.form.origin_price = +this.form.origin_price;
		Api.addProductItem(form).then(res => {
			this.dialogVisible = false;
			EventBus.SystemAlert(Status.SysMessageType.Information, '新增成功');
			EventBus.FullLoading(false);
			this.getProductList();
		});
	}

	modify(form: Model.IProductItem) {
		EventBus.FullLoading(true);
		this.form.imageUrl = [this.img1, this.img2, this.img3, this.img4, this.img5];
		Api.modifyProductItem(form, form.id).then(res => {
			this.dialogVisible = false;
			EventBus.FullLoading(false);
			EventBus.SystemAlert(Status.SysMessageType.Information, '修改成功');
			this.getProductList();
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
		this.startDate = '';
		this.endDate = '';
		this.modifyButton = false;
		this.submitButton = false;
		this.dialogVisible = false;
	}
}
</script>
