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
};
