import { IActionContextBasic } from '@/store/index';
import * as Model from '@/models/interfaces/common';

export interface IState {
	// 所有訂單列表
	StrokeList: Model.IIineraryContentReponse;
}

const SRTOKE_LIST = 'SRTOKE_LIST';

const initState: IState = {
	StrokeList: { sea: { title: '', content: [] }, land: { title: '', content: [] }, shopping: { title: '', content: [] }, history: { title: '', content: [] } },
};

const getters = {
	StrokeList: (state: IState) => state.StrokeList,
};

const actions = {
	setStrokeList(context: IActionContextBasic, payload: string) {
		context.commit(SRTOKE_LIST, payload);
	},
};

const mutations = {
	[SRTOKE_LIST](state: IState, payload: Model.IIineraryContentReponse) {
		state.StrokeList = payload;
	},
};

export default {
	namespaced: true,
	state: initState,
	getters,
	actions,
	mutations,
};
