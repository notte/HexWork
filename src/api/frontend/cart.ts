import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/frontend/cart';
const URL = process.env.VUE_APP_URL;
const UUID = process.env.VUE_APP_UUID;

export default {
	// 前端，取得購物車列表
	async getCart(): Promise<Model.ICartListReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/ec/shopping`,
		};
		const result = await Handler.request(config);
		return <Model.ICartListReponse>result.data;
	},
};
