<template>
	<div>
		<div class="login">
			<el-input placeholder="請輸入帳號" />
			<el-input placeholder="請輸入密碼" />
			<el-button type="primary">登入</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class FourthWeek extends Vue {}
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