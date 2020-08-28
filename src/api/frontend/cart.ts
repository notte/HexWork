import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/frontend/cart';

export default {
	// 前端，取得購物車列表
	async getCart(): Promise<Model.ICartListReponse> {
		const config = {
			method: 'get',
			url: `/api/ec/shopping`,
		};
		const result = await Handler.request(config);
		return <Model.ICartListReponse>result.data;
	},
};
