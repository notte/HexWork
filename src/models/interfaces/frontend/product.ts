export interface IGetProductListReponse {
	data: IProductList[];
	meta: IMeta;
}

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

export interface IProductItemReponse {
	data: IData;
}

export interface IAddProductCartRequest {
	product: string;
	quantity: string;
}

export interface IData {
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
	options: IOption;
	created_at: string;
	created_diff: string;
	updated_at: string;
	updated_diff: string;
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

export interface IOption {
	message: string;
}
