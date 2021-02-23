<template>
	<div>
		<!-- 後台 -->
		<Login v-if="isShow('Login')" />
		<Work v-if="isShow('Backoffice')" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Work from '@/components/Backoffice/Backoffice.vue';
import Login from '@/components/Backoffice/Login.vue';
import * as Status from '@/models/status/type';

@Component({
	components: { Login, Work },
})
export default class Backoffice extends Vue {
	// 目前顯示頁面
	CurrentType: string = Status.OpenType.Login;
	Login: Status.OpenType.Login = Status.OpenType.Login;
	Backoffice: Status.OpenType.Backoffice = Status.OpenType.Backoffice;

	// 切換目前顯示的頁面
	isShow(tab: Status.OpenType): boolean {
		return this.CurrentType === tab ? true : false;
	}

	created() {
		// 如果無法取得 token
		if (!localStorage.getItem('accessToken')) {
			// 顯示登入
			this.CurrentType = 'Login';
			// 並跳轉 router
			this.$router.push({ name: 'Login' });
		} else {
			// 顯示後台
			this.CurrentType = 'Backoffice';
		}
	}
}
</script>
