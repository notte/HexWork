<template>
	<div>
		<div class="FifthWeek">
			<!-- 產品列表 -->
			<div class="product-list">
				<div class="item" v-for="(item, index) in tableData" :key="index">
					<div class="img">
						<img :src="item.imageUrl[0]" alt />
					</div>
					<div class="text">
						<h2>{{ item.title }}</h2>
						<h3>{{ item.content }}</h3>
						<el-divider></el-divider>
						<div class="money">
							<h4>原價{{ item.origin_price }}元</h4>
							<h1>現在只要{{ item.price }}元</h1>
						</div>

						<el-divider></el-divider>
						<div class="button">
							<el-button @click="showDialog(item)">查看</el-button>
							<el-button type="primary" @click="addAproduct(item.id)">加入購物車</el-button>
						</div>
					</div>
				</div>
			</div>
			<!-- 購物車 -->
			<div class="cart">
				<h1>購物車</h1>
				<!-- 購物車列表 -->
				<div class="cart-list">
					<el-button class="addButton" type="danger" plain @click="deleteAll">清除購物車</el-button>
					<el-table :data="ProductList" empty-text="購物車無商品">
						<el-table-column label="刪除">
							<template slot-scope="scope">
								<el-button size="mini" type="danger" plain @click="dele(scope.row.product)">
									<i class="el-icon-delete"></i>
								</el-button>
							</template>
						</el-table-column>

						<el-table-column label="產品名稱">
							<template slot-scope="scope">
								<span>{{ scope.row.product.title }}</span>
							</template>
						</el-table-column>
						<el-table-column label="數量" width="200">
							<template slot-scope="scope">
								<el-input-number v-model="scope.row.quantity" :min="1" size="mini"></el-input-number>
							</template>
						</el-table-column>
						<el-table-column label="單位">
							<template slot-scope="scope">
								<span>{{ scope.row.product.unit }}</span>
							</template>
						</el-table-column>
						<el-table-column label="售價">
							<template slot-scope="scope">
								<span>{{ scope.row.product.price }}</span>
							</template>
						</el-table-column>
					</el-table>
					<h3>共計：{{ pay }}元</h3>
				</div>
				<!-- 表單 -->
				<div class="form" :model="form">
					<el-form ref="form" :model="form" label-width="80px" :rules="rules">
						<el-form-item label="收件人" prop="name" required>
							<el-input v-model.lazy="form.name" />
						</el-form-item>
						<el-form-item label="E-mail" prop="email" required>
							<el-input v-model.lazy="form.email" />
						</el-form-item>
						<el-form-item label="電話" prop="tel" required>
							<el-input v-model.lazy="form.tel" />
						</el-form-item>
						<el-form-item label="地址" prop="address" required>
							<el-input v-model.lazy="form.address" />
						</el-form-item>
						<el-form-item label="付款方式">
							<el-input v-model.lazy="form.payment" />
						</el-form-item>
						<el-form-item label="留言">
							<textarea type="textarea" v-model.lazy="form.message"></textarea>
						</el-form-item>
					</el-form>
					<el-button type="primary">送出表單</el-button>
				</div>
			</div>
		</div>
		<!-- dialog -->
		<el-dialog class="form-Modal" :visible.sync="dialogVisible" width="30%" @close="beforeClose">
			<h1>{{ Product.title }}</h1>
			<h3>{{ Product.content }}</h3>
			<h4>原價{{ Product.origin_price }}元</h4>
			<h1>現在只要{{ Product.price }}元</h1>
			<el-select v-model="value" placeholder="請選擇">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<h2>小計{{ Product.price * value }}元</h2>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogAddCart(value, Product.id)">加到購物車</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import axios, { AxiosRequestConfig } from 'axios';
import * as Modal from '@/models/interfaces/common';
import { Loading } from 'element-ui';

@Component
export default class FifthWeek extends Vue {
	// 購物車總金額
	pay: number = 0;
	uuid: string = '59677b21-aeb1-45eb-8ac8-9fe077baa5a0';
	token: string | null = '';
	config: AxiosRequestConfig = {};
	dialogVisible: boolean = false;
	// 購物車數量
	value: number = 0;
	// 已加購物車列表
	ProductList: Modal.ProductList[] = [];
	// 商品列表
	tableData: Modal.FourthWeek[] = [];
	// 購買數量選項
	options: object[] = [
		{
			value: 1,
			label: '選購 1 單位',
		},
		{
			value: 2,
			label: '選購 2 單位',
		},
		{
			value: 3,
			label: '選購 3 單位',
		},
		{
			value: 4,
			label: '選購 4 單位',
		},
		{
			value: 5,
			label: '選購 5 單位',
		},
	];
	// 開啟的商品
	Product: Modal.FourthWeek = { id: '', title: '', category: '', content: '', description: '', imageUrl: [], enabled: false, origin_price: 0, price: 0, unit: '' };
	// 消費者表單
	form: Modal.FifthWeek = {
		name: '',
		email: '',
		tel: '',
		address: '',
		payment: '',
		coupon: '',
		message: '',
	};
	// 驗證規則
	rules: object = {
		name: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
		email: [{ required: true, message: '請輸入電子信箱', trigger: 'blur' }],
		tel: [{ required: true, message: '請輸入電話', trigger: 'blur' }],
		address: [{ required: true, message: '請輸入地址', trigger: 'blur' }],
	};

	created() {
		this.token = localStorage.getItem('Token');

		this.config.headers = {
			Authorization: 'Bearer' + ' ' + this.token,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		};

		this.TableUpdate();
		this.CartUpdate();
	}

	// 關閉視窗，資料歸零
	beforeClose() {
		this.value = 0;
		this.dialogVisible = false;
	}

	// 購物車全刪除
	deleteAll() {
		const loadingInstance = Loading.service({ fullscreen: true });
		axios
			.delete('/api' + this.uuid + '/ec/shopping/all/product', this.config)
			.then((res) => {
				this.CartUpdate();
			})
			.catch((err) => {});
		this.pay = 0;
	}

	// 新增一樣商品
	addAproduct(id: string) {
		const loadingInstance = Loading.service({ fullscreen: true });
		axios
			.post('/api' + this.uuid + '/ec/shopping', { product: id, quantity: 1 }, this.config)
			.then((res) => {
				this.dialogVisible = false;
				this.CartUpdate();
			})
			.catch((err) => {});
	}

	// 刪除指定商品
	dele(product: Modal.FourthWeek) {
		const loadingInstance = Loading.service({ fullscreen: true });
		axios
			.delete('/api' + this.uuid + '/ec/shopping/' + product.id, this.config)
			.then((res) => {
				this.CartUpdate();
			})
			.catch((err) => {});
	}

	// 商品列表
	TableUpdate() {
		const loadingInstance = Loading.service({ fullscreen: true });
		axios
			.get('/api' + this.uuid + '/admin/ec/products', this.config)
			.then((res) => {
				this.tableData = res.data.data;
				loadingInstance.close();
			})
			.catch((err) => {});
	}

	// 更新購物車
	CartUpdate() {
		const loadingInstance = Loading.service({ fullscreen: true });
		axios
			.get('/api' + this.uuid + '/ec/shopping', this.config)
			.then((res) => {
				this.ProductList = res.data.data;
				loadingInstance.close();
			})
			.catch((err) => {});
	}

	// 購物車總金額
	@Watch('ProductList')
	sumPay() {
		this.pay = 0;
		for (const item of this.ProductList) {
			this.pay = this.pay + item.product.price * item.quantity;
		}
	}

	// 查看單一商品
	showDialog(item: Modal.FourthWeek) {
		const loadingInstance = Loading.service({ fullscreen: true });
		axios
			.get('/api' + this.uuid + '/ec/product/' + item.id, this.config)
			.then((res) => {
				this.Product = res.data.data;
				loadingInstance.close();
				this.dialogVisible = true;
			})
			.catch((err) => {});
	}

	// Dialog 新增購物車
	dialogAddCart(value: number, id: string) {
		if (value === 0) {
			this.$confirm('請選擇數量');
		}

		const loadingInstance = Loading.service({ fullscreen: true });
		axios
			.post('/api' + this.uuid + '/ec/shopping', { product: id, quantity: value }, this.config)
			.then((res) => {
				this.dialogVisible = false;
				this.CartUpdate();
				loadingInstance.close();
			})
			.catch((err) => {});
	}
}
</script>

<style lang="scss">
.product-list {
	display: flex;
	.item {
		margin: 15px;
		display: inline-block;
		flex: 1;
		border-radius: 5px;
		border: 1px solid #ccc;
		.img {
			width: 100%;
			height: 300px;
			overflow: hidden;
			img {
				width: 100%;
			}
		}
		.text {
			padding: 15px;
			.money {
				* {
					display: inline-block;
				}

				h4 {
					color: rgb(102, 102, 102);
					text-decoration: line-through;
				}
				h1 {
					color: #000;
				}
			}
			.button {
				text-align: right;
			}
		}
	}
}

.form {
	text-align: right;
}

.form-Modal {
	h4 {
		text-decoration: line-through;
	}
}

.cart {
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 10px;
	border: 1px solid #ccc;
	margin: 20px;
	width: 50%;
	padding: 50px;
	h1 {
		text-align: center;
		border-bottom: 4px solid;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		width: 40%;
		padding-bottom: 10px;
		margin-bottom: 30px;
	}

	.cart-list {
		margin-bottom: 30px;
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
</style>
