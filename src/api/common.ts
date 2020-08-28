import Handler from '@/utilities/api-handle';
import * as Model from '@/models/interfaces/common';

export default {
	async login(payload: Model.IgetTokenRequest): Promise<Model.IgetTokenReponse> {
		const config = {
			method: 'post',
			url: `/token`,
			data: payload,
		};
		const result = await Handler.request(config);
		return <Model.IgetTokenReponse>result.data;
	},
	async logout(): Promise<Model.IlogOutReponse> {
		const config = {
			method: 'post',
			url: `/logout`,
		};
		const result = await Handler.request(config);
		return <Model.IlogOutReponse>result.data;
	},
};
