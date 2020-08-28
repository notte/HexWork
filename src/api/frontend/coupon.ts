import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/frontend/coupon';

export default {
	// 後台，取得優惠券列表
	async getCouponList(): Promise<Model.ICouponListReponse> {
		const config = {
			method: 'get',
			url: `/api/admin/ec/coupons`,
		};
		const result = await Handler.request(config);
		return <Model.ICouponListReponse>result.data;
	},
};
