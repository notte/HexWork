import Vue from 'vue';
import Vuex, { Commit, Dispatch } from 'vuex';
import token from '@/store/token';
import cart from '@/store/cart';
import order from '@/store/order';
import stroke from '@/store/stroke';

Vue.use(Vuex);

// 引入各功能切分的 module
export default new Vuex.Store({
	modules: {
		token,
		cart,
		order,
		stroke,
	},
});

// 從 vuex 導入的 commit 及 dispatch，導出 interface 給各 module
export interface IActionContextBasic {
	commit: Commit;
	dispatch: Dispatch;
}
