<template>
	<!-- 行程 -->
	<div class="stroke">
		<div class="title">
			<h1>【大人囝仔】森林聚落／紫斑蝶季．霧中仙境</h1>
			<div class="image">
				<img src="~@/assets/taiwan/south/kaohsiung-2728058.jpg" alt />
			</div>
			<h2>所有行程</h2>
			<div class="other-time">
				<el-table :data="tableData" :show-header="false">
					<el-table-column prop="date"></el-table-column>
					<el-table-column prop="name"></el-table-column>
					<el-table-column prop="number"></el-table-column>
					<el-table-column prop="address"></el-table-column>
					<el-table-column prop="buy">
						<el-button>查看</el-button>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="content">
			<!-- 描述 -->
			<div class="description">
				<!-- <div class="img">
					<img src="~@/assets/taiwan/south/the-urban-landscape-1698285-compressor.jpg" alt="" />
				</div> -->
				<h2>不再是後山，是片淨土</h2>
				<h2>有多久沒有好好深呼吸了呢？ 來花蓮享受好山 好水，大口呼吸</h2>
				<h2>看看山、看看水、看看天空、看看海、看看風吹草動</h2>
				<h2>來花蓮走走吧❤️</h2>
			</div>
			<div class="divider" />
			<!-- 行程文宣 -->
			<div class="Propaganda">
				<h1>花蓮的山海，自由自在無拘無束</h1>
				<div class="text">
					<h3>世界遺產潛力點►太魯閣國家公園</h3>
					<div class="img">
						<img src="~@/assets/taiwan/south/the-urban-landscape-1698285-compressor.jpg" alt="" />
					</div>
					<p>
						太魯閣峽谷是台灣島上具有世界級水準的地理景觀。峽谷沿立霧溪而行長達數十公里，觸目所及皆是壁立千仞的峭壁、斷崖、峽谷，連綿曲折的山洞隧道、大理岩層和溪流等風光，歷經立霧溪沖刷重量、風化侵蝕和地殼上升的變動，才成就了太魯閣雄偉壯闊的峽谷景觀，遊客無不讚嘆造物者之鬼斧神工。如今我們在太魯閣峭壁看到的裸露岩層，擁有6500萬年的歷史，在台灣這座僅約600萬年歲的年輕島嶼，居然藏著如此古老靈魂。尤以天祥至太魯閣口一段最為壯觀，也是主要的旅遊據點，由於地理景觀獨特，內政部於民國75年設立了「太魯閣國家公園」，成為我國第四座國家公園。
					</p>
				</div>
				<div class="text">
					<h3>世界遺產潛力點►太魯閣國家公園</h3>
					<div class="img">
						<img src="~@/assets/taiwan/south/the-urban-landscape-1698285-compressor.jpg" alt="" />
					</div>
					<p>
						太魯閣峽谷是台灣島上具有世界級水準的地理景觀。峽谷沿立霧溪而行長達數十公里，觸目所及皆是壁立千仞的峭壁、斷崖、峽谷，連綿曲折的山洞隧道、大理岩層和溪流等風光，歷經立霧溪沖刷重量、風化侵蝕和地殼上升的變動，才成就了太魯閣雄偉壯闊的峽谷景觀，遊客無不讚嘆造物者之鬼斧神工。如今我們在太魯閣峭壁看到的裸露岩層，擁有6500萬年的歷史，在台灣這座僅約600萬年歲的年輕島嶼，居然藏著如此古老靈魂。尤以天祥至太魯閣口一段最為壯觀，也是主要的旅遊據點，由於地理景觀獨特，內政部於民國75年設立了「太魯閣國家公園」，成為我國第四座國家公園。
					</p>
				</div>
			</div>
			<div class="stroke">
				<h3>預定行程</h3>
				<p>【大人囝仔】森林聚落／紫斑蝶季．霧中仙境</p>
				<div class="addCart">
					<h1>NT.30000</h1>
					<el-select v-model="value" placeholder="請選擇"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select>
					<h3>/人</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
	components: {},
})
export default class Taipei extends Vue {
	// 錯誤訊息：This relative module was not found
	// 解法，路徑修改為 -> ~@/assets/taiwan/south/kaohsiung-2728058.jpg
	tableData: object[] = [
		{
			date: '出發日期',
			name: '星期幾',
			number: '可賣：1',
			address: '$10,000',
		},
		{
			date: '出發日期',
			name: '星期幾',
			number: '可賣：1',
			address: '$10,000',
		},
		{
			date: '出發日期',
			name: '星期幾',
			number: '可賣：1',
			address: '$10,000',
		},
	];
	options: object[] = [
		{
			value: '选项1',
			label: '黄金糕',
		},
		{
			value: '选项2',
			label: '双皮奶',
		},
		{
			value: '选项3',
			label: '蚵仔煎',
		},
		{
			value: '选项4',
			label: '龙须面',
		},
		{
			value: '选项5',
			label: '北京烤鸭',
		},
	];
	value: string = '';
}
</script>
