import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/backoffice/order';
const URL = process.env.VUE_APP_URL;
const UUID = process.env.VUE_APP_UUID;

export default {
	async getOrderList(): Promise<Model.IGetOrderListReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/admin/ec/orders`,
		};
		const result = await Handler.request(config);
		return <Model.IGetOrderListReponse>result.data;
	},
	async getOrderItem(id: string): Promise<Model.IGetOrderItem> {
		const config = {
			method: 'get',
			url: URL + UUID + `/admin/ec/orders/${id}`,
		};
		const result = await Handler.request(config);
		return <Model.IGetOrderItem>result.data;
	},
	async setUnpaid(id: string): Promise<Model.IGetOrderItem> {
		const config = {
			method: 'patch',
			url: URL + UUID + `/admin/ec/orders/${id}/unpaid`,
		};
		const result = await Handler.request(config);
		return <Model.IGetOrderItem>result.data;
	},
	async setPaid(id: string): Promise<Model.IGetOrderItem> {
		const config = {
			method: 'patch',
			url: URL + UUID + `/admin/ec/orders/${id}/paid`,
		};
		const result = await Handler.request(config);
		return <Model.IGetOrderItem>result.data;
	},
};
