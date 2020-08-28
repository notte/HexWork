import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/common';
const URL = process.env.VUE_APP_URL;

export default {
	async login(payload: Model.IgetTokenRequest): Promise<Model.IgetTokenReponse> {
		const config = {
			method: 'post',
			url: URL + `auth/login`,
			data: payload,
		};
		const result = await Handler.request(config);
		return <Model.IgetTokenReponse>result.data;
	},
	async logout(token: string | null): Promise<Model.ItokenReponse> {
		const config = {
			method: 'post',
			url: URL + `auth/logout`,
			data: { api_token: token },
		};
		const result = await Handler.request(config);
		return <Model.ItokenReponse>result.data;
	},
	async check(token: string | null): Promise<Model.ItokenReponse> {
		const config = {
			method: 'post',
			url: URL + `auth/check`,
			data: { api_token: token },
		};
		const result = await Handler.request(config);
		return <Model.ItokenReponse>result.data;
	},
};
