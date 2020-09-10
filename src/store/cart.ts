import { IActionContextBasic } from '@/store/index';
import * as Model from '@/models/interfaces/frontend/cart';

export interface IState {
	CartList: Model.ICartListAndCoupon;
	SetOrderForm: Model.ISetOrderUserForm;
	OrderInfo: Model.ISetOrderInfo;
}

const SET_CART_LIST = 'SET_CART_LIST';
const SET_ORDER_FORM = 'SET_ORDER_FORM';
const SET_ORDER_INFO = 'SET_ORDER_INFO';

const initState: IState = {
	// id: '', title: '', category: '', content: '', imageUrl: [], enabled: true, origin_price: 0, price: 0, unit: ''
	CartList: {
		data: [],
		total: '',
		coupon: '',
		discountTotal: '',
	},
	SetOrderForm: { name: '', email: '', tel: null, address: '', payment: '', message: '', coupon: '' },
	OrderInfo: { id: '', datetime: '', amount: 0 },
};

const getters = {
	CartList: (state: IState) => state.CartList,
	OrderForm: (state: IState) => state.SetOrderForm,
	OrderInfo: (state: IState) => state.OrderInfo,
};

const actions = {
	setCartList(context: IActionContextBasic, payload: string) {
		context.commit(SET_CART_LIST, payload);
	},
	SetOrderForm(context: IActionContextBasic, payload: string) {
		context.commit(SET_ORDER_FORM, payload);
	},
	SetOrderInfo(context: IActionContextBasic, payload: string) {
		context.commit(SET_ORDER_INFO, payload);
	},
};

const mutations = {
	[SET_CART_LIST](state: IState, payload: Model.ICartListAndCoupon) {
		state.CartList = payload;
	},
	[SET_ORDER_FORM](state: IState, payload: Model.ISetOrderUserForm) {
		state.SetOrderForm = payload;
	},
	[SET_ORDER_INFO](state: IState, payload: Model.ISetOrderInfo) {
		state.OrderInfo = payload;
	},
};

export default {
	namespaced: true,
	state: initState,
	getters,
	actions,
	mutations,
};
