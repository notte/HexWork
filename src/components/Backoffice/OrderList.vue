<template>
	<div class="OrderList">
		<el-table empty-text="無商品" :data="PageData[CurrentPage]">
			<el-table-column label="訂單 ID 前八碼">
				<template slot-scope="scope">
					<span>{{ scope.row.id | captureOrderID }}</span>
				</template>
			</el-table-column>

			<el-table-column label="總金額">
				<template slot-scope="scope">
					<span>${{ scope.row.amount | moneyFormat }}</span>
				</template>
			</el-table-column>
			<el-table-column label="付款時間">
				<template slot-scope="scope">
					<span>{{ scope.row.paid_at | captureTime }}</span>
				</template>
			</el-table-column>
			<el-table-column label="優惠券" prop="coupon.code"></el-table-column>
			<el-table-column label="更新時間" prop="updated.datetime"></el-table-column>
			<el-table-column label="編輯">
				<template slot-scope="scope">
					<el-button size="mini" @click="edit(scope.row.id)">編輯</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			@current-change="handleCurrentChange"
			:page-count="TotalPage"
			small
			layout="prev, pager, next"
		></el-pagination>

		<el-dialog :visible.sync="dialogVisible">
			<el-card class="box-card">
				<div class="item">
					<p>更新時間：</p>
					<p>{{ time }}</p>
				</div>
				<div class="item">
					<p>訂單編號：</p>
					<p>{{ id | captureOrderID }}</p>
				</div>
				<div class="item">
					<p>訂單金額：</p>
					<p>${{ amount | moneyFormat }}</p>
				</div>
				<div class="item">
					<p>優惠券：</p>
					<p v-if="orderItem.coupon">{{ orderItem.coupon.code }}</p>
					<p v-if="!orderItem.coupon"></p>
				</div>
				<el-divider>
					<h3>購買產品</h3>
				</el-divider>
				<div class="item" v-for="(item, index) in orderItem.products" :key="index">
					<p>{{ item.product.title }} x {{ item.quantity }}</p>
				</div>
			</el-card>

			<div class="changeOrder">
				<h2>修改訂單</h2>
				<div class="item" v-for="(item, index) in orderItem.products" :key="index">
					<h3>{{ item.product.title }}</h3>
					<el-select v-model="item.quantity" placeholder="請選擇">
						<el-option v-for="num in options" :key="num" :label="num" :value="num"></el-option>
					</el-select>
				</div>
				<h3>訂單是否已付款</h3>
				<el-switch v-model="orderItem.paid" active-text="已付" inactive-text="未付"></el-switch>
			</div>

			<span slot="footer" class="dialog-footer">
				<el-button class="cancel" @click="dialogVisible = false">取消</el-button>
				<el-button @click="modify(orderItem.paid, orderItem.id)">修改</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter, namespace } from 'vuex-class';
import { Component, Watch } from 'vue-property-decorator';
import * as Model from '@/models/interfaces/backoffice/order';
import { formatMixin } from '@/utilities/format';
import Api from '@/api/backoffice/order';

const tokenModule = namespace('order');
const qs = require('qs');

@Component({ mixins: [formatMixin] })
export default class ProductList extends Vue {
	// 分頁後所有訂單資料 + 對應優惠券
	PageData: object = {
		data: [],
		coupon: '',
	};
	// 選中頁數
	CurrentPage: number = 0;
	// 總頁數
	TotalPage: number = 0;
	// 所有訂單資料
	orderList: Model.IGetOrderList[] = [];
	// 單一筆訂單
	orderItem = {} as Model.IOrder;
	// 訂單 ID
	id: string = '';
	// 訂單完成時間
	time: string = '';
	// 訂單總金額
	amount: number = 0;
	// 判斷 Modal 是否開啟
	dialogVisible: boolean = false;
	options: number[] = [1, 2, 3, 4, 5];
	@Action('order/setOrderList') private setOrderList!: any;

	created() {
		// 取得所有訂單
		this.getOrderList();
	}

	// 監聽所有訂單變數
	@Watch('orderList')
	TotalePage() {
		const newData: any = [];
		this.orderList.forEach((item, i) => {
			if (i % 10 === 0) {
				newData.push([]);
			}
			const page = Math.floor(i / 10);
			newData[page].push(item);
		});

		this.TotalPage = newData.length;
		this.PageData = newData;
	}

	handleCurrentChange(val: number) {
		this.CurrentPage = val - 1;
	}

	// 取得訂單列表
	getOrderList() {
		Api.getOrderList().then((res) => {
			this.orderList = res.data;
			this.setOrderList(this.orderList);
		});
	}

	// 編輯訂單
	edit(id: string) {
		this.dialogVisible = true;
		Api.getOrderItem(id).then((res) => {
			this.orderItem = res.data;
			// 在 Modal 顯示對應訂單資料
			this.id = this.orderItem.id;
			this.time = this.orderItem.updated.datetime;
			this.amount = this.orderItem.amount;
		});
	}

	// 送出修改
	modify(paid: boolean, id: string) {
		// 切換已付款 / 未付款狀態
		if (paid === true) {
			Api.setPaid(id).then((res) => {});
		} else {
			Api.setUnpaid(id).then((res) => {});
		}
		this.dialogVisible = false;
		// 重新取得訂單
		this.getOrderList();
	}
}
</script>
