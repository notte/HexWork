<template>
	<div>
		<Carousel />
		<el-row class="TaiwanMain">
			<el-col v-for="o in 9" :key="o">
				<el-card shadow="hover">
					<div class="item-image">
						<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
					</div>
					<div class="item">
						<div class="tag">
							<span class="sea">海上</span>
							<span class="land">陸上</span>
							<span class="shopping">購物</span>
							<span class="history">歷史</span>
						</div>
						<h3>野柳地質公園．極北富貴角．玻璃屋星巴克 1 日</h3>
						<div class="money">
							<h1>$10,000</h1>
							<el-button @click="checkStroke">看看行程</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Carousel from '@/components/Common/Carousel.vue';
import * as EventBus from '@/utilities/event-bus';
import * as Status from '@/models/status/type';

@Component({
	components: { Carousel },
})
export default class TaiwanMain extends Vue {
	checkStroke() {
		EventBus.getOpenType(Status.OpenType.TaiwanItem);
	}
}
</script>
