<template>
	<div class="Main">
		<Carousel />
		<div class="Main-content">
			<h2>關於 Journey</h2>
			<div class="img">
				<img src="https://i.imgur.com/D3v5BnN.jpg" alt />
			</div>
			<p>
				「Journey」因應不同的市場定位及顧客的需求差異，調整價位與產品設定，精準回饋消費者的需求；定位開創新產品服務新客群，規劃高端質感的旅遊產品。<br />
				透過精選的住房環境、美味的餐飲、舒適的交通和特色的景點，期許帶給不同客群更有質感、更有節奏的深度旅遊和享受。
			</p>

			<h3>創立於1985年</h3>
			<p>
				目前全球共有100個實體服務據點；包括24hr門市、複合式人文空間、橫跨兩岸三地、東北亞、東南亞、美洲、歐洲與澳洲。<br />
				除致力於旅遊產業垂直整合外，雄獅旅遊導入資訊化與知識管理系統，並積極朝生活產業水平擴展，秉持「Lion, Enriching Life」，朝向「全球華人旅遊生活服務第一品牌」之目標邁進。
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
