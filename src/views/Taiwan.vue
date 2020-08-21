<template>
	<div>
		<TaiwanMain v-if="isShow('TaiwanMain')" />
		<Location v-if="isShow('Location')" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import TaiwanMain from '@/components/Taiwan/TaiwanMain.vue';
import Location from '@/components/Taiwan/Location.vue';
import * as Status from '@/models/status/type';
import EventBus from '@/utilities/event-bus';

@Component({
	components: { TaiwanMain, Location },
})
export default class Taiwan extends Vue {
	CurrentType: string = Status.OpenType.TaiwanMain;
	TaiwanMain: Status.OpenType.TaiwanMain = Status.OpenType.TaiwanMain;
	TaiwanItem: Status.OpenType.TaiwanItem = Status.OpenType.TaiwanItem;

	// 判斷當前要顯示哪個組件
	isShow(tab: Status.OpenType): boolean {
		return this.CurrentType === tab ? true : false;
	}

	mounted() {
		// 接收事件
		EventBus.$on('open-type', (param: any) => {
			this.$router.push({ name: param.type }).catch(err => {});
			this.CurrentType = param.type;
		});
	}
}
</script>
