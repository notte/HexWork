// 取得優惠券列表
export interface ICouponListReponse {
	data: IData[];
	meta: IMeta;
}

interface IMeta {
	pagination: IPagination;
}

interface IData {
	id: string;
	title: string;
	code: string;
	percent: number;
	enabled: boolean;
	deadline: IDeadline;
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

interface IDeadline {
	diff: string;
	datetime: string;
	timestamp: number;
}

interface IPagination {
	total: number;
	count: number;
	per_page: number;
	current_page: number;
	total_pages: number;
	links: void /* undefined */[];
}
