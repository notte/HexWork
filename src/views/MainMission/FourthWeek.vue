<template>
	<div>
		<div class="login">
			<el-input v-model="email" placeholder="請輸入帳號" />
			<el-input type="password" v-model="password" placeholder="請輸入密碼" />
			<el-button type="primary" @click="login(email, password)">登入</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import * as Modal from '@/models/interfaces/common';

@Component
export default class FourthWeek extends Vue {
	email: string = '';
	password: string = '';

	login(email: string, password: string) {
		axios
			.post('https://course-ec-api.hexschool.io/api/auth/login', { email: this.email, password: this.password })
			.then(res => {
				localStorage.setItem('Token', res.data.token);
				this.$router.push({ name: 'FourthWeek_login' });
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
