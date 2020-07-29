<template>
	<div>
		<!-- <TaiwanMain /> -->
		<Taipei />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import TaiwanMain from '@/components/Taiwan/TaiwanMain.vue';
import Taipei from '@/components/Taiwan/Taipei.vue';

@Component({
	components: { TaiwanMain, Taipei },
})
export default class Taiwan extends Vue {}
</script>
