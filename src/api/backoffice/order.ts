import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/backoffice/order';
const URL = process.env.VUE_APP_URL;
const UUID = process.env.VUE_APP_UUID;

export default {
	// 後台，取得訂單列表
	async getOrderList(): Promise<Model.IGetOrderListReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/admin/ec/orders`,
		};
		const result = await Handler.request(config);
		return <Model.IGetOrderListReponse>result.data;
	},
	// 後台，取得單一訂單
	async getOrderItem(id: string): Promise<Model.IGetOrderItem> {
		const config = {
			method: 'get',
			url: URL + UUID + `/admin/ec/orders/${id}`,
		};
		const result = await Handler.request(config);
		return <Model.IGetOrderItem>result.data;
	},
	// 後台，訂單改未付
	async setUnpaid(id: string): Promise<Model.IGetOrderItem> {
		const config = {
			method: 'patch',
			url: URL + UUID + `/admin/ec/orders/${id}/unpaid`,
		};
		const result = await Handler.request(config);
		return <Model.IGetOrderItem>result.data;
	},
	// 後台，訂單改已付
	async setPaid(id: string): Promise<Model.IGetOrderItem> {
		const config = {
			method: 'patch',
			url: URL + UUID + `/admin/ec/orders/${id}/paid`,
		};
		const result = await Handler.request(config);
		return <Model.IGetOrderItem>result.data;
	},
};
