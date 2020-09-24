import { IError, IErrorData } from '@/models/interfaces/common';
import EventBus from '@/utilities/event-bus';

const requestSuccess = (config: any) => {
	return config;
};

const requestFail = (error: any) => {
	err.message = '[token null] request fail';
	EventBus.$emit('api-error', err);
	return Promise.reject(error);
};

const responseSuccess = (response: any) => {
	return Promise.resolve(response);
};

const responseFail = (errorData: any) => {
	const { traceId, error } = <IError>errorData.response.data;
	if (errorData.response) {
		if (traceId && error) {
			err.message = errorData.response.data.error.message;
		} else {
			const { status, data, statusText } = errorData.response;
			err.code = status;
			err.message = `${data} ${statusText}`;
		}
	} else {
		err.message = JSON.stringify(errorData);
	}
	return Promise.reject(err);
	EventBus.$emit('api-error', err);
	EventBus.$emit('full-loading', false);
};

const err: IErrorData = {
	code: '',
	message: '',
};

export { requestSuccess, requestFail, responseSuccess, responseFail };
