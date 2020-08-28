<template>
	<div class="Main">
		<Carousel />
		<div class="commodity-search">
			<div class="item">
				<el-date-picker v-model="setOff" placeholder="出發日期" type="date" />
			</div>
			<div class="item">
				<el-date-picker v-model="returnTrip" placeholder="回程日期" type="date" />
			</div>
			<div class="item">
				<el-button class="major">搜尋行程</el-button>
			</div>
		</div>
		<TravelList />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Carousel from '@/components/Common/Carousel.vue';
import TravelList from '@/components/Common/TravelList.vue';

@Component({
	components: { Carousel, TravelList },
})
export default class Main extends Vue {
	setOff: string = '';
	returnTrip: string = '';
}
</script>
