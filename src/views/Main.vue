<template>
	<div class="Main">
		<SixBoxTop />
		<div class="Main-content">
			<p>
				「Journey」因應不同的市場定位及顧客的需求差異，調整價位與產品設定，精準回饋消費者的需求；定位開創新產品服務新客群，規劃高端質感的旅遊產品。
				<br />透過精選的住房環境、美味的餐飲、舒適的交通和特色的景點，期許帶給不同客群更有質感、更有節奏的深度旅遊和享受。
			</p>

			<h3>創立於1985年</h3>
			<p>
				目前全球共有100個實體服務據點；包括24hr門市、複合式人文空間、橫跨兩岸三地、東北亞、東南亞、美洲、歐洲與澳洲。
				<br />除致力於旅遊產業垂直整合外，雄獅旅遊導入資訊化與知識管理系統，並積極朝生活產業水平擴展，秉持「Lion, Enriching Life」。
				<br />朝向「全球華人旅遊生活服務第一品牌」之目標邁進。
			</p>

			<h3>專業品質．創新價值</h3>
			<p>
				「Journey」誠懇聆聽顧客的心聲和需求，根據回饋，不斷修正旅遊產品與創造全新的企劃理念，以親切貼心的服務，提供最適合貴賓的行程作為依歸，其目標就是為營造最貼近消費者的旅遊市場環境，滿足需求並保護旅客應有的權益。
				「Journey」是可以滿足既有需求的經營者；更是具備創意，能開發出嶄新需求的開創者！秉承初衷努力實現，呈獻給我們的每一位旅客。我們誠摯帶您走訪世界的各個角落，豐富您美好的人生，見證您幸福的時刻。
			</p>
		</div>
		<SixBoxBottom />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import SixBoxTop from '@/components/Common/SixBox_Top.vue';
import SixBoxBottom from '@/components/Common/SixBox_Bottom.vue';

@Component({
	components: { SixBoxTop, SixBoxBottom },
})
export default class Main extends Vue {}
</script>
