import { IActionContextBasic } from '@/store/index';
// 引入 commit 及 dispatch
import * as Model from '@/models/interfaces/frontend/cart';

export interface IState {
	CartList: Model.ICartData;
}

const CARTLIST = 'CARTLIST';

const initState: IState = {
	CartList: {
		product: { id: '', title: '', category: '', content: '', imageUrl: [], enabled: true, origin_price: 0, price: 0, unit: '' },
		quantity: 0,
		created_at: '',
		created_diff: '',
		updated_at: '',
		updated_diff: '',
	},
};

const getters = {
	CartList: (state: IState) => state.CartList,
};

const actions = {
	setCartList(context: IActionContextBasic, payload: string) {
		context.commit(CARTLIST, payload);
	},
};

const mutations = {
	[CARTLIST](state: IState, payload: Model.ICartData) {
		state.CartList = payload;
	},
};

export default {
	namespaced: true,
	state: initState,
	getters,
	actions,
	mutations,
};
