<template>
	<div>
		<!-- 搜尋後結果 -->
		<div class="recommend">
			<el-row class="recommendList">
				<el-col v-for="o in 10" :key="o">
					<el-card shadow="hover">
						<div class="item-image">
							<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" />
						</div>
						<div class="item">
							<p>野柳地質公園．極北富貴角．玻璃屋星巴克 1 日</p>
							<div class="money">
								<el-button>More</el-button>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Recommend extends Vue {}
</script>
