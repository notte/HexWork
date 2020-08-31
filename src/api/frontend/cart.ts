import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/frontend/cart';
const URL = process.env.VUE_APP_URL;
const UUID = process.env.VUE_APP_UUID;

export default {
	// 取得購物車列表
	async getCart(): Promise<Model.ICartListReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/ec/shopping`,
		};
		const result = await Handler.request(config);
		return <Model.ICartListReponse>result.data;
	},
	// 清空購物車
	async emptyCart(): Promise<string> {
		const config = {
			method: 'delete',
			url: URL + UUID + `/ec/shopping/all/product`,
		};
		const result = await Handler.request(config);
		return <string>result.data;
	},
	// 更新單一產品
	async editProduct(params: Model.IEditProductCartRequest): Promise<Model.ICartListReponse> {
		const config = {
			method: 'patch',
			url: URL + UUID + `/ec/shopping`,
			data: params,
		};
		const result = await Handler.request(config);
		return <Model.ICartListReponse>result.data;
	},
	// 刪除一產品
	async deleteProduct(id: string, params: Model.IDeleteProductCartRequest): Promise<Model.ICartListReponse> {
		const config = {
			method: 'delete',
			url: URL + UUID + `/ec/shopping/${id}`,
			data: params,
		};
		const result = await Handler.request(config);
		return <Model.ICartListReponse>result.data;
	},
};
