// 帶入api handler，透過此去call api
import Handler from '@/utilities/api-handle';
// 管理request及reponse型別
import * as Model from '@/models/interfaces/front-end';

export default {
	// 前端，取得所有商品
	async getProductList(): Promise<Model.IGetProductListReponse> {
		const config = {
			method: 'get',
			url: `/api/ec/products`,
		};
		const result = await Handler.request(config);
		return <Model.IGetProductListReponse>result.data;
	},
	// 前端，取得單一產品細節
	async getProductItem(id: string): Promise<Model.IProductItemReponse> {
		const config = {
			method: 'get',
			url: `/api/ec/product/${id}`,
		};
		const result = await Handler.request(config);
		return <Model.IProductItemReponse>result.data;
	},
};
