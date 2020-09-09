import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/backoffice/coupon';
const URL = process.env.VUE_APP_URL;
const UUID = process.env.VUE_APP_UUID;

export default {
	// 後台，取得優惠券列表
	async getCouponList(): Promise<Model.ICouponListReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/admin/ec/coupons`,
		};
		const result = await Handler.request(config);
		return <Model.ICouponListReponse>result.data;
	},
	// 後台，新增優惠券一張
	async addCoupon(coupon: Model.IAddCouponItem): Promise<Model.IAddCouponItemReponse> {
		const config = {
			method: 'post',
			url: URL + UUID + `/admin/ec/coupon`,
			data: coupon,
		};
		const result = await Handler.request(config);
		return <Model.IAddCouponItemReponse>result.data;
	},
	// 後台，取得單一優惠券細節
	async getCouponItem(id: string): Promise<Model.IAddCouponItemReponse> {
		const config = {
			method: 'get',
			url: URL + UUID + `/admin/ec/coupon/${id}`,
		};
		const result = await Handler.request(config);
		return <Model.IAddCouponItemReponse>result.data;
	},
	// 後台，修改單一優惠券細節
	async modifyCouponItem(id: string, coupon: Model.IAddCouponItem): Promise<Model.IAddCouponItemReponse> {
		const config = {
			method: 'patch',
			url: URL + UUID + `/admin/ec/coupon/${id}`,
			data: coupon,
		};
		const result = await Handler.request(config);
		return <Model.IAddCouponItemReponse>result.data;
	},
};
