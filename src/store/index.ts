import Vue from 'vue';
import Vuex, { Commit, Dispatch } from 'vuex';
import token from '@/store/token';
import cart from '@/store/cart';
import order from '@/store/order';
import stroke from '@/store/stroke';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		token,
		cart,
		order,
		stroke,
	},
});

export interface IActionContextBasic {
	commit: Commit;
	dispatch: Dispatch;
}
