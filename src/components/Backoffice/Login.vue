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
import * as Model from '@/models/interfaces/common';
import * as EventBus from '@/utilities/event-bus';
import * as Status from '@/models/status/type';
import Api from '@/api/common.ts';

const tokenModule = namespace('token');
const qs = require('qs');

@Component
export default class Login extends Vue {
	dynamicValidateForm: Model.IgetTokenRequest = {
		email: '',
		password: '',
	};

	rules: object = {
		email: [
			{ required: true, message: '請輸入電子信箱', trigger: 'blur' },
			{ type: 'email', message: '請輸入正確的信箱', trigger: ['blur', 'change'] },
		],
	};

	@tokenModule.State('token') token!: string;
	@Action('token/setToken') private setToken!: any;

	login(dynamicValidateForm: Model.IgetTokenRequest) {
		EventBus.FullLoading(true);
		Api.login(dynamicValidateForm).then(res => {
			localStorage.setItem('accessToken', res.token);
			this.setToken(res.token);
			this.$router.push({ name: 'Backoffice' });
			EventBus.setTag();

			EventBus.FullLoading(false);
			this.$notify({
				title: '登入成功',
				message: '',
				position: 'bottom-left',
				showClose: false,
				duration: 5000,
				iconClass: 'el-icon-lollipop',
				customClass: 'alertItem_info',
			});
		});
	}
}
</script>
