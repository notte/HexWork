import Vue from 'vue';
import * as Status from '@/models/status/type';

export const getScrollEvent = (now: number, next: number) => {
	EventBus.$emit('to-scroll', { now, next });
};

export const getTaiwanOpenType = (type: Status.OpenType) => {
	EventBus.$emit('get-TaiwanOpenType', { type });
};

const EventBus = new Vue();
export default EventBus;
