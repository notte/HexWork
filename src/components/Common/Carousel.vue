<template>
	<div class="Carousel">
		<el-carousel :interval="5000" arrow="never" height="400px" direction="vertical">
			<el-carousel-item v-for="item in 5" :key="item">
				<h3>{{ item }}</h3>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Header extends Vue {}
</script>
