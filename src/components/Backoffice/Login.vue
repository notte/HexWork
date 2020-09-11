<template>
	<div class="login_layout">
		<div class="login">
			<h1>登入</h1>
			<el-form :model="dynamicValidateForm" :rules="rules" ref="dynamicValidateForm" class="demo-dynamic">
				<el-form-item prop="email">
					<el-input placeholder="請輸入電子信箱" v-model="dynamicValidateForm.email"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="請輸入密碼" v-model="dynamicValidateForm.password"></el-input>
				</el-form-item>
			</el-form>
			<el-button type="primary" @click="login(dynamicValidateForm)">登入</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter, namespace } from 'vuex-class';
import { Component, Provide } from 'vue-property-decorator';
import axios from 'axios';
import Api from '@/api/common.ts';
import * as EventBus from '@/utilities/event-bus';
import * as Status from '@/models/status/type';
import * as Model from '@/models/interfaces/common';

const tokenModule = namespace('token');
const qs = require('qs');

@Component
export default class Login extends Vue {
	dynamicValidateForm: Model.IgetTokenRequest = {
		email: '',
		password: '',
	};

	// @Provide() rules = {
	// 	email: [
	// 		{ required: true, message: '請輸入電子信箱', trigger: 'blur' },
	// 		{ type: 'email', message: '請輸入正確的信箱', trigger: ['blur', 'change'] },
	// 	],
	// };

	rules: object = {
		email: [
			{ required: true, message: '請輸入電子信箱', trigger: 'blur' },
			{ type: 'email', message: '請輸入正確的信箱', trigger: ['blur', 'change'] },
		],
	};

	// 映射 state 到變數 Token
	@tokenModule.State('token') token!: string;
	@Action('token/setToken') private setToken!: any;

	login(dynamicValidateForm: Model.IgetTokenRequest) {
		Api.login(dynamicValidateForm).then(res => {
			// 將 token 儲存 localStorage
			localStorage.setItem('accessToken', res.token);
			// 將 token 儲存 vuex（暫用）
			this.setToken(res.token);
			// 跳轉 router 到後台
			this.$router.push({ name: 'Backoffice' });
			// 發送事件，讓登入登出按鈕切換顯示
			EventBus.setTag();
		});
	}
}
</script>
