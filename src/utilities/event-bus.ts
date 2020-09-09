import Vue from 'vue';
import * as Status from '@/models/status/type';

export const getScrollEvent = (now: number, next: number) => {
	EventBus.$emit('to-scroll', { now, next });
};

export const getOpenType = (type: Status.OpenType, id?: string) => {
	EventBus.$emit('open-type', { type, id });
};

export const setCartQuantity = (quantity?: number) => {
	EventBus.$emit('set-quantity', { quantity });
};

export const setTag = () => {
	EventBus.$emit('set-tag');
};

const EventBus = new Vue();
export default EventBus;
