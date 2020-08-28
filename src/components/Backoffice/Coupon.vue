<template>
	<div>
		<el-button class="addButton" @click="dialogVisible = true">新增優惠券</el-button>
		<el-table empty-text="無商品">
			<el-table-column label="名稱">
				<template slot-scope="scope">
					<span>{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<el-table-column label="序號">
				<template slot-scope="scope">
					<span>{{ scope.row.origin_price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="折扣百分比">
				<template slot-scope="scope">
					<span>{{ scope.row.origin_price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="是否啟用">
				<template slot-scope="scope">
					<span>{{ scope.row.enabled }}</span>
				</template>
			</el-table-column>
			<el-table-column label="截止日期">
				<template slot-scope="scope">
					<span>{{ scope.row.price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="編輯">
				<el-button size="mini">編輯</el-button>
				<el-button size="mini" class="major">刪除</el-button>
			</el-table-column>
		</el-table>
		<!-- 分頁 -->
		<el-pagination small layout="prev, pager, next"></el-pagination>

		<!-- dialog -->
		<el-dialog :visible.sync="dialogVisible" width="50%">
			<div class="fromImage">
				<img alt />
			</div>
			<el-form ref="form">
				<el-form-item label="名稱">
					<input />
				</el-form-item>
				<el-form-item label="序號">
					<input />
				</el-form-item>
				<el-form-item label="折扣百分比">
					<input />
				</el-form-item>
				<el-form-item label="截止日期">
					<input />
				</el-form-item>
				<el-form-item label="是否啟用">
					<el-switch active-text="啟用" inactive-text="不啟用"></el-switch>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button class="cancel" @click="dialogVisible = false">取消</el-button>
				<el-button>確定</el-button>
				<el-button>修改</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Api from '@/api/frontend/coupon.ts';
import * as Model from '@/models/interfaces/frontend/coupon';

@Component
export default class ProductList extends Vue {
	dialogVisible: boolean = false;

	created() {
		Api.getCouponList()
			.then(res => {
				// console.log(res);
			})
			.catch(err => {
				// console.log(err);
			});
	}
}
</script>
