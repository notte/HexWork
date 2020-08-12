<template>
	<div><CartMain /></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import CartMain from '@/components/Cart/CartMain.vue';

@Component({
	components: { CartMain },
})
export default class Foreign extends Vue {}
</script>
