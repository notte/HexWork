import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/backoffice/product';

export default {
	// 後台，取得所有商品
	async getBackofficeProductList(): Promise<Model.IGetProductListReponse> {
		const config = {
			method: 'get',
			url: `/api/admin/ec/products`,
		};
		const result = await Handler.request(config);
		return <Model.IGetProductListReponse>result.data;
	},
	// 後台，刪除單一產品
	async deleteProduct(id: string): Promise<Model.IGetProductListReponse> {
		const config = {
			method: 'delete',
			url: `/api/admin/ec/product/${id}`,
		};
		const result = await Handler.request(config);
		return <Model.IGetProductListReponse>result.data;
	},
	// 後台，新增商品
	async addProductItem(form: Model.IProductItem): Promise<Model.IGetProductListReponse> {
		const config = {
			method: 'post',
			url: `/api/admin/ec/product`,
			data: form,
		};
		const result = await Handler.request(config);
		return <Model.IGetProductListReponse>result.data;
	},
	// 後台，修改商品
	async modifyProductItem(form: Model.IProductItem, id: string): Promise<Model.IGetProductListReponse> {
		const config = {
			method: 'patch',
			url: `/api/admin/ec/product/${id}`,
			data: form,
		};
		const result = await Handler.request(config);
		return <Model.IGetProductListReponse>result.data;
	},
};
