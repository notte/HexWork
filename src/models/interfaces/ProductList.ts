// 個別商品
export interface IProductItem {
	// 自動生成
	id: string;
	// 行程名稱
	title: string;
	// 行程類型，購物 / 水上 / 陸上 / 歷史 / 地點...
	category: string;
	// 已賣名額
	content: string;
	// 行程地點，台灣北部 / 台灣南部 / 日本...
	description: string;
	// imageUrl[0] 為主要商品照
	// imageUrl[1] ~ [4] 為行程介紹照片
	imageUrl: string[];
	// 是否成團
	enabled: boolean;
	// 出團時間
	origin_price: number;
	// 價格
	price: number;
	// 總名額
	unit: string;
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
