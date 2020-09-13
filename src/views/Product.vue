<template>
	<div class="Product">
		<TravelList />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import TravelList from '@/components/Common/TravelList.vue';

@Component({
	components: { TravelList },
})
export default class Product extends Vue {}
</script>
