// models > interfaces，為管理資料型別的檔案

// get Token API
export interface IgetTokenRequest {
	grant_type: string;
	client_id: string;
	client_secret: string;
}

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
	product: FifthWeek;
	quantity: number;
	created_at: string;
	created_diff: string;
	updated_at: string;
	updated_diff: string;
}
