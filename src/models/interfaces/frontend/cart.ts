// 購物車列表
export interface ICartListReponse {
	data: ICartData[];
	meta: IMeta;
}

// 更新單一產品
export interface IEditProductCartRequest {
	product: string;
	quantity: string;
}

// 刪除
export interface IDeleteProductCartRequest {
	product: string;
}

// 收件者表單
export interface ISetOrderUserForm {
	name: string;
	email: string;
	tel: string | null;
	address: string;
	payment: string;
	message?: string;
	coupon?: string;
}

// 已成立訂單
export interface IOrderItemReponse {
	data: IOrder;
}

interface IOrder {
	id: string;
	message: string;
	user: IUser;
	coupon: ICoupon;
	amount: number;
	products: IProductQuantity[];
	payment: string;
	paid: boolean;
	paid_at: void /* 未知类型 */;
	paid_diff: void /* 未知类型 */;
	created: ITime;
	created_diff: string;
	updated: ITime;
}

interface ITime {
	datetime: string;
	diff: string;
	timestamp: number;
}

interface IProductQuantity {
	product: IProduct;
	quantity: number;
}

interface ICoupon {
	title: string;
	code: string;
	percent: number;
	enabled: boolean;
	deadline_at: string;
}

interface IUser {
	name: string;
	email: string;
	tel: string;
	address: string;
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
