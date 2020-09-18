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
	dialogVisible: boolean = false;
	couponList: Model.IData[] = [];
	couponID: string = '';
	modifyButton: boolean = false;
	addCouponButton: boolean = true;

	form: Model.IAddCouponItem = {
		title: '',
		code: '',
		percent: 0,
		enabled: false,
		deadline_at: '',
	};

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

	addCoupon(form: Model.IAddCouponItem) {
		EventBus.FullLoading(true);
		Api.addCoupon(form).then(res => {
			this.dialogVisible = false;

			EventBus.FullLoading(false);
			this.getCouponList();
			EventBus.SystemAlert(Status.SysMessageType.Information, '新增成功');
		});
	}

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

	edit(id: string) {
		EventBus.FullLoading(true);
		this.modifyButton = true;
		this.addCouponButton = false;
		this.couponID = id;
		this.dialogVisible = true;
		Api.getCouponItem(id).then(res => {
			this.form.code = res.data.code;
			this.form.title = res.data.title;
			this.form.percent = res.data.percent;
			this.form.enabled = res.data.enabled;
			this.form.deadline_at = res.data.deadline.datetime;

			EventBus.FullLoading(false);
		});
	}

	modify(id: string, form: Model.IAddCouponItem) {
		EventBus.FullLoading(true);
		Api.modifyCouponItem(id, form).then(res => {
			this.dialogVisible = false;
			EventBus.FullLoading(false);
			EventBus.SystemAlert(Status.SysMessageType.Information, '編輯成功');
			this.getCouponList();
		});
	}

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
