<template>
	<div class="Main">
		<Carousel />
		<div class="Main-content">
			<h3>關於 Journey</h3>
			<div class="img">
				<img src="https://i.imgur.com/D3v5BnN.jpg" alt />
			</div>
			<p>
				「Journey」因應不同的市場定位及顧客的需求差異，調整價位與產品設定，精準回饋消費者的需求。
				「 Signature 雄獅璽品」定位開創新產品服務新客群，規劃高端質感的旅遊產品，透過精選的住房環境、美味的餐飲、舒適的交通和特色的景點，期許帶給不同客群更有質感、更有節奏的深度旅遊和享受。
			</p>
		</div>
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
