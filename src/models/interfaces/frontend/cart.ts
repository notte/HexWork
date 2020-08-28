// 購物車列表
export interface ICartListReponse {
	data: ICartData[];
	meta: IMeta;
}

export interface ICartData {
	product: IProduct;
	quantity: number;
	created_at: string;
	created_diff: string;
	updated_at: string;
	updated_diff: string;
}

export interface IProduct {
	id: string;
	title: string;
	category: string;
	content: string;
	imageUrl: string[];
	enabled: boolean;
	origin_price: number;
	price: number;
	unit: string;
}

export interface IMeta {
	pagination: IPagination;
}

export interface IPagination {
	total: number;
	count: number;
	per_page: number;
	current_page: number;
	total_pages: number;
	links: void /* undefined */[];
}
