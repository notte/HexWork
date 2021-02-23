<template>
	<div class="Product">
		 <Product v-if="isShow('TravelList')" />
		 <Location v-if="isShow('Location')" :productId="productId"/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Product from '@/components/Common/Product.vue';
import Location from '@/components/Common/Location.vue';
import * as Status from '@/models/status/type';
import EventBus from '@/utilities/event-bus';

@Component({ components: { Product,Location } })
export default class TravelList extends Vue {
	// 目前顯示頁面
	CurrentType: string = Status.OpenType.TravelList;
	TravelList: Status.OpenType.TravelList = Status.OpenType.TravelList;
	Location: Status.OpenType.Location = Status.OpenType.Location;
	productId:string = '';

	isShow(tab: Status.OpenType): boolean {
		return this.CurrentType === tab ? true : false;
	}

	mounted() {
		// 接收修改顯示頁面
		EventBus.$on('open-product-type', (param: { type: string; id: string }) => {
			this.productId = param.id;
			this.CurrentType = param.type;
			this.$router.push({ name: Status.OpenType.Location, params: { id: this.productId } });
		});
	}
}
</script>
