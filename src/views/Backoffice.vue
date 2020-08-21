<template>
	<div>
		<!-- <Login v-if="isShow('Login')" /> -->
		<!-- v-if="isShow('Backoffice')" -->
		<Work />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Login from '@/components/Backoffice/Login.vue';
import Work from '@/components/Backoffice/Backoffice.vue';
import * as Status from '@/models/status/type';
import EventBus from '@/utilities/event-bus';

@Component({
	components: { Login, Work },
})
export default class Backoffice extends Vue {
	CurrentType: string = Status.OpenType.Login;
	Login: Status.OpenType.Login = Status.OpenType.Login;
	Backoffice: Status.OpenType.Backoffice = Status.OpenType.Backoffice;

	// 判斷當前要顯示哪個組件
	isShow(tab: Status.OpenType): boolean {
		return this.CurrentType === tab ? true : false;
	}

	// 要做一個驗證機制，如果有 token 且 token 沒有過期，應該直接進入 Backoffice
	// 反之則是要跳回登入頁面

	mounted() {
		// 接收事件
		EventBus.$on('open-type', (param: any) => {
			this.$router.push({ name: param.type }).catch(err => {});
			this.CurrentType = param.type;
		});
	}
}
</script>
