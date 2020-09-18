import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/frontend/cart';
const URL = process.env.VUE_APP_URL;
const UUID = process.env.VUE_APP_UUID;

export default {
	async getCart(): Promise<Model.ICartListReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/ec/shopping`,
		};
		const result = await Handler.request(config);
		return <Model.ICartListReponse>result.data;
	},
	async emptyCart(): Promise<string> {
		const config = {
			method: 'delete',
			url: URL + UUID + `/ec/shopping/all/product`,
		};
		const result = await Handler.request(config);
		return <string>result.data;
	},
	async editProduct(params: Model.IEditProductCartRequest): Promise<Model.ICartListReponse> {
		const config = {
			method: 'patch',
			url: URL + UUID + `/ec/shopping`,
			data: params,
		};
		const result = await Handler.request(config);
		return <Model.ICartListReponse>result.data;
	},
	async deleteProduct(id: string, params: Model.IDeleteProductCartRequest): Promise<Model.ICartListReponse> {
		const config = {
			method: 'delete',
			url: URL + UUID + `/ec/shopping/${id}`,
			data: params,
		};
		const result = await Handler.request(config);
		return <Model.ICartListReponse>result.data;
	},
	async setOrder(params: Model.ISetOrderUserForm): Promise<Model.IOrderItemReponse> {
		const config = {
			method: 'post',
			url: URL + UUID + `/ec/orders`,
			data: params,
		};
		const result = await Handler.request(config);
		return <Model.IOrderItemReponse>result.data;
	},
	async checkOut(id: string): Promise<Model.IOrderItemReponse> {
		const config = {
			method: 'post',
			url: URL + UUID + `/ec/orders/${id}/paying`,
		};
		const result = await Handler.request(config);
		return <Model.IOrderItemReponse>result.data;
	},
	async getCoupon(coupon: string): Promise<Model.IcheckCouponReponse> {
		const config = {
			method: 'post',
			url: URL + UUID + `/ec/coupon/search`,
			data: { code: coupon },
		};
		const result = await Handler.request(config);
		return <Model.IcheckCouponReponse>result.data;
	},
};
