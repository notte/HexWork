import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/backoffice/coupon';
const URL = process.env.VUE_APP_URL;
const UUID = process.env.VUE_APP_UUID;

export default {
	async getCouponList(): Promise<Model.ICouponListReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/admin/ec/coupons`,
		};
		const result = await Handler.request(config);
		return <Model.ICouponListReponse>result.data;
	},
	async addCoupon(coupon: Model.IAddCouponItem): Promise<Model.IAddCouponItemReponse> {
		const config = {
			method: 'post',
			url: URL + UUID + `/admin/ec/coupon`,
			data: coupon,
		};
		const result = await Handler.request(config);
		return <Model.IAddCouponItemReponse>result.data;
	},
	async getCouponItem(id: string): Promise<Model.IAddCouponItemReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/admin/ec/coupon/${id}`,
		};
		const result = await Handler.request(config);
		return <Model.IAddCouponItemReponse>result.data;
	},
	async modifyCouponItem(id: string, coupon: Model.IAddCouponItem): Promise<Model.IAddCouponItemReponse> {
		const config = {
			method: 'patch',
			url: URL + UUID + `/admin/ec/coupon/${id}`,
			data: coupon,
		};
		const result = await Handler.request(config);
		return <Model.IAddCouponItemReponse>result.data;
	},
	async deleteCouponItem(id: string): Promise<Model.IDeteteCouponReponse> {
		const config = {
			method: 'delete',
			url: URL + UUID + `/admin/ec/coupon/${id}`,
		};
		const result = await Handler.request(config);
		return <Model.IDeteteCouponReponse>result.data;
	},
};
