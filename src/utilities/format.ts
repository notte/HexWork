import * as EventBus from '@/utilities/event-bus';

export const formatMixin = {
	filters: {
		// 三位數補上一逗點
		moneyFormat(money: string | string[]) {
			money = money + '';
			money = money.split('');

			let i = -3;
			const a = -money.length;

			while (i > a || -i - -a < 3) {
				money.splice(i, 0, ',');
				i = i - 4;
			}

			if (money[0] === ',') {
				money.splice(0, 1);
			}

			money = money.join('');

			return money;
		},
		timeFormat(time: string) {
			const newTime = time.split('~');

			time = newTime[0] + ' 至 ' + newTime[1];
			return time;
		},
		captureTime(time: string | null) {
			if (typeof time === 'string') {
				const timeArray = time.substring(0, 19).split('T');
				time = timeArray[0] + ' ' + timeArray[1];
			} else {
				time = '尚未付款';
			}
			return time;
		},
		captureOrderID(id: string) {
			id = id.substring(0, 8);
			return id;
		},
	},
};
