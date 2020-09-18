import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/frontend/product';
const URL = process.env.VUE_APP_URL;
const UUID = process.env.VUE_APP_UUID;

export default {
	async getProductList(): Promise<Model.IGetProductListReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/ec/products`,
		};
		const result = await Handler.request(config);
		return <Model.IGetProductListReponse>result.data;
	},
	async getProductItem(id: string): Promise<Model.IProductItemReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/ec/product/${id}`,
		};
		const result = await Handler.request(config);
		return <Model.IProductItemReponse>result.data;
	},
	async addProductCart(params: Model.IAddProductCartRequest): Promise<Model.IProductItemReponse> {
		const config = {
			method: 'post',
			url: URL + UUID + `/ec/shopping`,
			data: params,
		};
		const result = await Handler.request(config);
		return <Model.IProductItemReponse>result.data;
	},
};
