import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import axios from 'axios';
import locale from 'element-ui/lib/locale/lang/zh-TW.js';
import * as EventBus from '@/utilities/event-bus';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style.scss';

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

axios.get('/js/travelContent.json').then((res: any) => {
	EventBus.getSrtokeList(res.data);
});

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
