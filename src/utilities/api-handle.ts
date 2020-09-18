import Vue from 'vue';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { requestSuccess, requestFail, responseSuccess, responseFail } from './error-handler';

class Axios {
	constructor() {}
	async request<T>(cfg: AxiosRequestConfig) {
		cfg.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		};

		if ((cfg.url as string).search('admin') !== -1) {
			cfg.headers = {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			};
		}

		const instance = axios.create();

		instance.interceptors.request.use(
			config => requestSuccess(config),
			err => requestFail(err)
		);

		instance.interceptors.response.use(
			response => responseSuccess(response),
			errorData => responseFail(errorData)
		);

		let result;

		try {
			result = await instance.request<T>(cfg);
			return Promise.resolve(result);
		} catch (throwError) {
			return Promise.reject(throwError);
		}
	}
}

const model = new Axios();

export default model;
