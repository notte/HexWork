// models > interfaces，為管理資料型別的檔案

// get Token API
export interface IgetTokenRequest {
	grant_type: string;
	client_id: string;
	client_secret: string;
}

// 個別商品
export interface IProductItem {
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
	// 還沒想到
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

// 作業 interface
export interface ThirdWeek {
	title: string;
	category: string;
	content: string;
	description: string;
	imageUrl: string;
	enabled: boolean;
	origin_price: number;
	price: number;
	unit: string;
}
export interface FourthWeek {
	id: string;
	title: string;
	category: string;
	content: string;
	description: string;
	imageUrl: string[];
	enabled: boolean;
	origin_price: number;
	price: number;
	unit: string;
}
export interface Login {
	email: string;
	password: string;
}

export interface FifthWeek {
	name: string;
	email: string;
	tel: string;
	address: string;
	payment: string;
	coupon: string;
	message: string;
}

export interface ProductList {
	product: FourthWeek;
	quantity: number;
	created_at: string;
	created_diff: string;
	updated_at: string;
	updated_diff: string;
}
