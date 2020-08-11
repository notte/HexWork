import Vue from 'vue';

export const getScrollEvent = (now: number, next: number) => {
	EventBus.$emit('to-scroll', { now, next });
};

const EventBus = new Vue();
export default EventBus;
