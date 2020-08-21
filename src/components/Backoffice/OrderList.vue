<template>
	<div>
		<el-table empty-text="無商品">
			<el-table-column label="名稱">
				<template slot-scope="scope">
					<span>{{ scope.row.category }}</span>
				</template>
			</el-table-column>

			<el-table-column label="Email">
				<template slot-scope="scope">
					<span>{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<el-table-column label="電話">
				<template slot-scope="scope">
					<span>{{ scope.row.origin_price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="優惠券">
				<template slot-scope="scope">
					<span>{{ scope.row.price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="付款方式">
				<template slot-scope="scope">
					<span>{{ scope.row.price }}</span>
				</template>
			</el-table-column>
			<el-table-column label="是否已付款">
				<template slot-scope="scope">
					<span>{{ scope.row.enabled }}</span>
				</template>
			</el-table-column>
			<el-table-column label="建立時間">
				<template slot-scope="scope">
					<span>{{ scope.row.enabled }}</span>
				</template>
			</el-table-column>
			<el-table-column label="編輯">
				<el-button size="mini">編輯</el-button>
				<el-button size="mini" class="major">刪除</el-button>
			</el-table-column>
		</el-table>

		<!-- 展開示意 -->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="商品名称">
							<span>{{ props.row.name }}</span>
						</el-form-item>
						<el-form-item label="所属店铺">
							<span>{{ props.row.shop }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="商品 ID" prop="id"></el-table-column>
			<el-table-column label="商品名称" prop="name"></el-table-column>
			<el-table-column label="描述" prop="desc"></el-table-column>
		</el-table>
		<!-- 展開結束 -->

		<!-- 分頁 -->
		<el-pagination small layout="prev, pager, next"></el-pagination>

		<!-- dialog -->
		<el-dialog :visible.sync="dialogVisible" width="50%">
			<div class="fromImage">
				<img alt />
			</div>
			<el-form ref="form">
				<el-form-item label="圖片網址">
					<input />
				</el-form-item>
				<el-form-item label="圖片網址">
					<input />
				</el-form-item>
				<el-form-item label="圖片網址">
					<input />
				</el-form-item>
				<el-form-item label="圖片網址">
					<input />
				</el-form-item>
				<el-form-item label="圖片網址">
					<input />
				</el-form-item>
				<el-form-item label="分類">
					<input />
				</el-form-item>
				<el-form-item label="單位">
					<input />
				</el-form-item>
				<el-form-item label="產品名稱">
					<input />
				</el-form-item>
				<el-form-item label="原價">
					<input />
				</el-form-item>
				<el-form-item label="售價">
					<input />
				</el-form-item>
				<el-form-item label="是否啟用">
					<el-switch active-text="啟用" inactive-text="不啟用"></el-switch>
				</el-form-item>
				<el-form-item label="產品描述">
					<textarea type="textarea" />
				</el-form-item>
				<el-form-item label="說明內容">
					<textarea type="textarea"></textarea>
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

@Component
export default class ProductList extends Vue {
	dialogVisible: boolean = false;
	tableData: object = [
		{
			id: '12987122',
			name: '好滋好味鸡蛋仔',
			category: '江浙小吃、小吃零食',
			desc: '荷兰优质淡奶，奶香浓而不腻',
			address: '上海市普陀区真北路',
			shop: '王小虎夫妻店',
			shopId: '10333',
		},
	];
}
</script>