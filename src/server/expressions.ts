import * as XRegExp from 'xregexp';

class Xr {
	constructor(data) {
		this._data = data;
	}

	exec(str) {
		return XRegExp.exec(str, XRegExp(this._data));
	}

	private _data;
}

const sum = '\\d+(?:\\.\\d+)?';

const datetime = '\\d\\d\\.\\d\\d\\.\\d\\d\\s\\d\\d:\\d\\d';

// export const buy = XRegExp(`(?<card>\\w+)`);
export const buy = new Xr(`(?<card>\\w+)\\s(?<datetime>${datetime})\\s(?<operation>.+)\\s(?<sum>${sum})р\\s(?<place>.+)\\sБаланс:\\s(?<balance>${sum})р`);

const ex = 'VISA1065 24.11.16 16:37 покупка 35р METRO.SPB.RU Баланс: 47521.40р';

console.log(buy.exec(ex));
