<template>
	<div class="Main">
		<Carousel />
		<div class="commodity-search">
			<div class="item">
				<el-input placeholder="出發地"></el-input>
			</div>
			<div class="item">
				<el-input placeholder="目的地"></el-input>
			</div>
			<div class="item">
				<el-date-picker start-placeholder="開始日期" end-placeholder="結束日期" type="datetimerange" :default-time="['12:00:00', '08:00:00']" />
			</div>
			<div class="item">
				<el-button class="search">搜尋行程</el-button>
			</div>
		</div>
		<Recommend />
		<!-- <Search /> -->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Carousel from '@/components/Common/Carousel.vue';
import Recommend from '@/components/Main/Recommend.vue';
import Search from '@/components/Main/Search.vue';

@Component({
	components: { Carousel, Recommend, Search },
})
export default class Main extends Vue {}
</script>
