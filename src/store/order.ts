import { IActionContextBasic } from '@/store/index';
import * as Model from '@/models/interfaces/backoffice/order';

export interface IState {
	// 所有訂單列表
	OrderList: object;
}

const ORDER_LIST = 'ORDER_LIST';

const initState: IState = {
	OrderList: {},
};

const getters = {
	OrderList: (state: IState) => state.OrderList,
};

const actions = {
	setOrderList(context: IActionContextBasic, payload: string) {
		context.commit(ORDER_LIST, payload);
	},
};

const mutations = {
	[ORDER_LIST](state: IState, payload: Model.IGetOrderList) {
		state.OrderList = payload;
	},
};

export default {
	namespaced: true,
	state: initState,
	getters,
	actions,
	mutations,
};
