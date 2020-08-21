// 帶入api handler，透過此去call api
import Handler from '@/utilities/api-handle';
// 管理request及reponse型別
import * as Model from '@/models/interfaces/coupon';

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
