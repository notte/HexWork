<template>
	<div>
		<Carousel />
		<el-row class="TaiwanMain">
			<el-col v-for="(o) in 9" :key="o">
				<el-card shadow="hover">
					<div class="item-image">
						<img
							src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
						/>
					</div>
					<div class="item">
						<div class="tag">
							<span>海上</span>
							<span>海上</span>
						</div>
						<h3>野柳地質公園．極北富貴角．玻璃屋星巴克 1 日</h3>
						<div class="money">
							<h1>$10,000</h1>
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

@Component({
	components: { Carousel },
})
export default class TaiwanMain extends Vue {}
</script>
