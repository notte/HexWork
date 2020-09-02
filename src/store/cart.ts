import { IActionContextBasic } from '@/store/index';
import * as Model from '@/models/interfaces/frontend/cart';

export interface IState {
	CartList: Model.ICartData;
	SetOrderForm: Model.ISetOrderUserForm;
}

const CARTLIST = 'CARTLIST';
const SET_ORDER_FORM = 'SET_ORDER_FORM';

const initState: IState = {
	CartList: {
		product: { id: '', title: '', category: '', content: '', imageUrl: [], enabled: true, origin_price: 0, price: 0, unit: '' },
		quantity: 0,
		created_at: '',
		created_diff: '',
		updated_at: '',
		updated_diff: '',
	},
	SetOrderForm: { name: '', email: '', tel: null, address: '', payment: '', message: '', coupon: '' },
};

const getters = {
	CartList: (state: IState) => state.CartList,
	SetOrderForm: (state: IState) => state.SetOrderForm,
};

const actions = {
	setCartList(context: IActionContextBasic, payload: string) {
		context.commit(CARTLIST, payload);
	},
	SetOrderForm(context: IActionContextBasic, payload: string) {
		context.commit(SET_ORDER_FORM, payload);
	},
};

const mutations = {
	[CARTLIST](state: IState, payload: Model.ICartData) {
		state.CartList = payload;
	},
	[SET_ORDER_FORM](state: IState, payload: Model.ISetOrderUserForm) {
		state.SetOrderForm = payload;
	},
};

export default {
	namespaced: true,
	state: initState,
	getters,
	actions,
	mutations,
};
