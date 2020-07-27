<template>
	<div>
		<Carousel />
		<!-- <el-divider /> -->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Carousel from '@/components/Common/Carousel.vue';

@Component({
	components: { Carousel },
})
export default class Main extends Vue {}
</script>
