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
