import { IActionContextBasic } from '@/store/index';
import * as Model from '@/models/interfaces/common';

export interface IState {
	// 所有行程文案列表
	ItineraryArticle: Model.IIineraryContentReponse;

	
}

const ITINERARY_ARTICLE = 'ITINERARY_LIST';

const initState: IState = {
	ItineraryArticle: { sea: { title: '', content: [] }, land: { title: '', content: [] }, shopping: { title: '', content: [] }, history: { title: '', content: [] } },
};

const getters = {
	ItineraryArticle: (state: IState) => state.ItineraryArticle,
};

const actions = {
	setItineraryArticle(context: IActionContextBasic, payload: string) {
		context.commit(ITINERARY_ARTICLE, payload);
	},
};

const mutations = {
	[ITINERARY_ARTICLE](state: IState, payload: Model.IIineraryContentReponse) {
		state.ItineraryArticle = payload;
	},
};

export default {
	namespaced: true,
	state: initState,
	getters,
	actions,
	mutations,
};
