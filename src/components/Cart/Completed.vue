<template>
	<div>
		<div class="Completed">
			<h2>感謝您的訂購，歡迎您再次光臨</h2>
			<el-card class="box-card">
				<div class="item">
					<p>完成時間：</p>
				</div>
				<div class="item">
					<p>訂單編號：</p>
				</div>
				<div class="item">
					<p>訂單金額：</p>
				</div>
			</el-card>
			<el-button>繼續選購</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Completed extends Vue {}
</script>
