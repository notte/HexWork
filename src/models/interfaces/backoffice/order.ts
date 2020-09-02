export interface IGetOrderListReponse {
	data: IGetOrderList[];
	meta: IMeta;
}

export interface IGetOrderList {
	id: string;
	coupon: ICoupon;
	amount: number;
	products: IProduct[];
	payment: string;
	paid: boolean;
	paid_at: void /* 未知类型 */;
	paid_diff: void /* 未知类型 */;
	created: ICreated;
	updated: IUpdated;
}

export interface IGetOrderItem {
	data: IOrder;
}

export interface IOrder {
	id: string;
	message: string;
	user: IUser;
	coupon: ICoupon;
	amount: number;
	products: IProduct[];
	payment: string;
	paid: boolean;
	paid_at: void /* 未知类型 */;
	paid_diff: void /* 未知类型 */;
	created: ICreated;
	updated: IUpdated;
}

interface IUser {
	name: string;
	email: string;
	tel: string;
	address: string;
}

export interface IUpdated {
	diff: string;
	datetime: string;
	timestamp: number;
}

export interface ICreated {
	diff: string;
	datetime: string;
	timestamp: number;
}

interface IProduct {
	product: IProductItem;
	quantity: number;
}

interface IProductItem {
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

interface ICoupon {
	title: string;
	code: string;
	percent: number;
	enabled: boolean;
	deadline: IDeadline;
}

interface IDeadline {
	diff: string;
	datetime: string;
	timestamp: number;
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
