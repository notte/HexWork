import Vue from 'vue';
import * as Status from '@/models/status/type';

export const getScrollEvent = (now: number, next: number) => {
	EventBus.$emit('to-scroll', { now, next });
};

export const getOpenType = (type: Status.OpenType, id?: string) => {
	EventBus.$emit('open-type', { type, id });
};

const EventBus = new Vue();
export default EventBus;
