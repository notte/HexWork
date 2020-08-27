import { IActionContextBasic } from '@/store/index';
// 引入 commit 及 dispatch

export interface IState {
	token: string;
}

const TOKEN = 'TOKEN';

const initState: IState = {
	token: '',
};

const getters = {
	token: (state: IState) => state.token,
};

const actions = {
	setToken(context: IActionContextBasic, payload: string) {
		context.commit(TOKEN, payload);
	},
};

const mutations = {
	[TOKEN](state: IState, payload: string) {
		state.token = payload;
	},
};

export default {
	namespaced: true,
	state: initState,
	getters,
	actions,
	mutations,
};
