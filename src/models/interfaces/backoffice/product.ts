export interface IProductItem {
	id: string;
	title: string;
	category: string;
	content: string;
	unit: string;
	imageUrl: string[];
	enabled: boolean;
	origin_price: number;
	price: number;
	description: string;
	options?: object;
}

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

export interface IGetProductItemReponse {
	data: IGetProductItem;
}

export interface IGetProductItem {
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
	created: ICreated;
	updated: IUpdated;
}

interface IUpdated {
	diff: string;
	datetime: string;
	timestamp: number;
}

interface ICreated {
	diff: string;
	datetime: string;
	timestamp: number;
}

interface IOption {
	message: string;
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
	links: void[];
}

interface IOption {
	message: string;
}
