<template>
	<div class="Coupon">
		<el-button class="addButton" @click="dialogVisible = true">新增優惠券</el-button>
		<el-table empty-text="無商品" :data="couponList">
			<el-table-column label="標題">
				<template slot-scope="scope">
					<span>{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<el-table-column label="序號">
				<template slot-scope="scope">
					<span>{{ scope.row.code }}</span>
				</template>
			</el-table-column>
			<el-table-column label="折扣百分比">
				<template slot-scope="scope">
					<span>{{ scope.row.percent }}%</span>
				</template>
			</el-table-column>
			<el-table-column label="是否啟用">
				<template slot-scope="scope">
					<span>{{ scope.row.enabled | setCoupon }}</span>
				</template>
			</el-table-column>
			<el-table-column label="截止日期">
				<template slot-scope="scope">
					<span>{{ scope.row.deadline.datetime }}</span>
				</template>
			</el-table-column>
			<el-table-column label="編輯">
				<template slot-scope="scope">
					<el-button size="mini" @click="edit(scope.row.id)">編輯</el-button>
					<el-button size="mini" class="major" @click="deteteCoupon(scope.row.id)">刪除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- Modal -->
		<el-dialog :visible.sync="dialogVisible" width="30%" @close="handleClose">
			<el-form ref="form" :model="form">
				<el-form-item label="標題">
					<el-input v-model.lazy="form.title" />
				</el-form-item>
				<el-form-item label="序號">
					<el-input v-model.lazy="form.code" />
				</el-form-item>
				<el-form-item label="折扣百分比">
					<el-input v-model.number.lazy="form.percent" />
				</el-form-item>
				<el-form-item label="截止時間">
					<el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model.lazy="form.deadline_at" />
				</el-form-item>
				<el-form-item label="是否啟用">
					<el-switch active-text="啟用" inactive-text="不啟用" v-model="form.enabled"></el-switch>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button class="cancel" @click="dialogVisible = false">取消</el-button>
				<el-button v-if="addCouponButton" @click="addCoupon(form)">確定</el-button>
				<el-button v-if="modifyButton" @click="modify(couponID, form)">修改</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as Model from '@/models/interfaces/backoffice/coupon';
import * as Status from '@/models/status/type';
import { formatMixin } from '@/utilities/format';
import Api from '@/api/backoffice/coupon';
import * as EventBus from '@/utilities/event-bus';

@Component({ mixins: [formatMixin] })
export default class ProductList extends Vue {
	// 判斷 Modal 視窗是否顯示
	dialogVisible: boolean = false;
	// 優惠券列表
	couponList: Model.IData[] = [];
	// 優惠券 ID
	couponID: string = '';
	// 判斷修改按鈕是否顯示
	modifyButton: boolean = false;
	// 判斷新增優惠券按鈕顯示
	addCouponButton: boolean = true;

	// 表格
	form: Model.IAddCouponItem = {
		title: '',
		code: '',
		percent: 0,
		enabled: false,
		deadline_at: '',
	};

	// 先取得優惠券列表
	created() {
		this.getCouponList();
	}

	getCouponList() {
		EventBus.FullLoading(true);
		Api.getCouponList().then(res => {
			this.couponList = res.data;

			EventBus.FullLoading(false);
		});
	}

	// 新增優惠券
	addCoupon(form: Model.IAddCouponItem) {
		EventBus.FullLoading(true);
		Api.addCoupon(form).then(res => {
			this.dialogVisible = false;

			EventBus.FullLoading(false);
			this.getCouponList();
			EventBus.SystemAlert(Status.SysMessageType.Information, '新增成功');
		});
	}

	// 刪除優惠券
	deteteCoupon(id: string) {
		this.$confirm('確認刪除？')
			.then(_ => {
				EventBus.FullLoading(true);
				Api.deleteCouponItem(id).then(res => {
					this.getCouponList();
					EventBus.FullLoading(false);
					EventBus.SystemAlert(Status.SysMessageType.Information, '刪除成功');
				});
			})
			.catch(err => {});
	}

	// 打開 Modal，編輯對應優惠券
	edit(id: string) {
		EventBus.FullLoading(true);
		// 顯示修改按鈕
		this.modifyButton = true;
		// 關閉新增按鈕（確認送出）
		this.addCouponButton = false;
		// 記錄目前打開優惠券 ID
		this.couponID = id;
		// 顯示 Modal（修改視窗）
		this.dialogVisible = true;
		// 取得單一優惠券 API
		Api.getCouponItem(id).then(res => {
			// 將 form 顯示對應資料
			this.form.code = res.data.code;
			this.form.title = res.data.title;
			this.form.percent = res.data.percent;
			this.form.enabled = res.data.enabled;
			this.form.deadline_at = res.data.deadline.datetime;

			EventBus.FullLoading(false);
		});
	}

	// click 修改按鈕
	modify(id: string, form: Model.IAddCouponItem) {
		EventBus.FullLoading(true);
		Api.modifyCouponItem(id, form).then(res => {
			this.dialogVisible = false;
			EventBus.FullLoading(false);
			EventBus.SystemAlert(Status.SysMessageType.Information, '編輯成功');
			this.getCouponList();
		});
	}

	// 關閉 Modal 視窗，將資料歸零
	handleClose() {
		this.form = {
			title: '',
			code: '',
			percent: 0,
			enabled: false,
			deadline_at: '',
		};
		this.modifyButton = false;
		this.addCouponButton = true;
	}
}
</script>
