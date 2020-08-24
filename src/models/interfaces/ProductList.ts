// 個別商品
export interface IProductItem {
	// 自動生成
	id: string;
	// 行程名稱
	title: string;
	// 行程類型，購物 / 水上 / 陸上 / 歷史 / 地點...
	category: string;
	// 出團時間，格式為 -> 年份.日期.月份~年份.日期.月份
	content: string;
	// 行程地點，台灣北部 / 台灣南部 / 日本...
	unit: string;
	// imageUrl[0] 為主要商品照
	// imageUrl[1] ~ [4] 為行程介紹照片
	imageUrl: string[];
	// 是否成團
	enabled: boolean;
	// 已賣名額
	origin_price: number;
	// 價格
	price: number;
	// 總名額
	description: string;
	// 還沒想到
	options?: object;
}

// 取得商品列表
export interface IGetProductListReponse {
	data: IProductList[];
	meta: IMeta;
}

// 商品 data 列表
export interface IProductList {
	id: string;
	title: string;
	category: string;
	content: string;
	imageUrl: string[];
	enabled: boolean;
	origin_price: number;
	price: number;
	unit: string;
	options: IOption;
}

interface IMeta {
	pagination: IPagination;
}

interface IPagination {
	total: number;
	count: number;
	per_page: number;
	current_page: number;
	total_pages: number;
	links: void /* undefined */[];
}

interface IOption {
	message: string;
}
