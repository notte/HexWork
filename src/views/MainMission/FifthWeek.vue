<template>
	<div>
		<div class="login">
			<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
				<el-form-item
					prop="email"
					:rules="[
						{ required: true, message: '請輸入電子信箱', trigger: 'blur' },
						{ type: 'email', message: '請輸入正確的信箱', trigger: ['blur', 'change'] },
					]"
				>
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
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import * as Modal from '@/models/interfaces/common';
import { Loading } from 'element-ui';

@Component
export default class FourthWeek extends Vue {
	dynamicValidateForm: Modal.Login = {
		email: '',
		password: '',
	};

	login(dynamicValidateForm: Modal.Login) {
		const loadingInstance = Loading.service({ fullscreen: true });
		axios
			.post('https://course-ec-api.hexschool.io/api/auth/login', { email: this.dynamicValidateForm.email, password: this.dynamicValidateForm.password })
			.then(res => {
				localStorage.setItem('Token', res.data.token);
				loadingInstance.close();
				this.$router.push({ name: 'FifthWeek_login' });
			})
			.catch(err => {});
	}
}
</script>

<style lang="scss">
.login {
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	top: 100px;
	width: 20%;
	padding: 30px;
	border-radius: 10px;
	box-shadow: 0px 6px 5px 0px #d5d5d554;
	border: 1px solid #d5d5d554;
	.el-input,
	.el-button {
		width: 100%;
		margin: 10px 0;
	}
}
</style>
