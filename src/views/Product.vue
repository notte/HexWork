<template>
	<div class="Product">
		<TravelList v-if="isShow('TravelList')" />
		<Location v-if="isShow('Location')" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import TravelList from '@/components/Common/TravelList.vue';
import Location from '@/components/Common/Location.vue';
import EventBus from '@/utilities/event-bus';
import * as Status from '@/models/status/type';

@Component({
	components: { TravelList, Location },
})
export default class Product extends Vue {
	// 目前顯示頁面
	CurrentType: string = Status.OpenType.TravelList;
	TravelList: Status.OpenType.TravelList = Status.OpenType.TravelList;
	Location: Status.OpenType.Location = Status.OpenType.Location;

	// 切換目前顯示的頁面
	isShow(tab: Status.OpenType): boolean {
		return this.CurrentType === tab ? true : false;
	}

	mounted() {
		// 接收修改顯示頁面
		EventBus.$on('open-product-type', (param: { type: string; id: string }) => {
			this.$router.push({ name: param.type, params: { id: param.id } }).catch(err => {});
			this.CurrentType = param.type;
		});
	}
}
</script>
