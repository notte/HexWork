<template>
	<div class="Main">
		<Carousel />
		<div class="commodity-search">
			<div class="item">
				<el-input placeholder="想去的地點、類型⋯⋯"></el-input>
			</div>
			<div class="item">
				<el-date-picker start-placeholder="開始時間" end-placeholder="結束時間" type="datetimerange" :default-time="['12:00:00', '08:00:00']" />
			</div>
			<div class="item">
				<el-button class="major">搜尋行程</el-button>
			</div>
		</div>
		<TaiwanMain />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Carousel from '@/components/Common/Carousel.vue';
import TaiwanMain from '@/components/Taiwan/TaiwanMain.vue';

@Component({
	components: { Carousel, TaiwanMain },
})
export default class Main extends Vue {}
</script>
