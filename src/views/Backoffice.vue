<template>
	<div>
		<Login v-if="isShow('Login')" />
		<Work v-if="isShow('Backoffice')" />
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

	isShow(tab: Status.OpenType): boolean {
		return this.CurrentType === tab ? true : false;
	}

	// created() {
	// 	this.$router.push({ name: this.CurrentType }).catch(err => {});
	// }

	mounted() {
		EventBus.$on('open-type', (param: any) => {
			this.$router.push({ name: param.type }).catch(err => {});
			this.CurrentType = param.type;
		});
	}
}
</script>
