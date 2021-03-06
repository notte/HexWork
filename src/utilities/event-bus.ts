import Vue from 'vue';
import * as Status from '@/models/status/type';

export const SystemAlert = (type: Status.SysMessageType, message: string, callback: any = () => {}) => {
	EventBus.$emit('system-alert', {
		type,
		message,
	});
};

export const FullLoading = (type: boolean) => {
	EventBus.$emit('full-loading', {
		type,
	});
};

export const getScrollEvent = () => {
	EventBus.$emit('to-scroll');
};

export const getOpenCartType = (type: Status.OpenType, id?: string) => {
	EventBus.$emit('open-cart-type', { type, id });
};
export const getOpenProductType = (type: Status.OpenType, id?: string) => {
	EventBus.$emit('open-product-type', { type, id });
};

export const setCartQuantity = (quantity?: number) => {
	EventBus.$emit('set-quantity', { quantity });
};

export const setTag = () => {
	EventBus.$emit('set-tag');
};

export const getSrtokeList = (StrokeList: object) => {
	EventBus.$emit('get-stroke', { StrokeList });
};

const EventBus = new Vue();
export default EventBus;
