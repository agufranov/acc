import { findSMSBackup } from './finder';
import getSMSList from './dbReader';
import * as xr from 'xregexp';
import { buy } from './expressions';

const backupPath = findSMSBackup();
console.log(buy);
getSMSList(backupPath).then(rawData => {
	let o = {};
	const g = rawData
		.map((d) => {
			if (!buy) console.error('NOT BUY');
			const r = buy.exec(d.text);
			if (r && r.operation === 'выдача')
				console.log(r);
			// console.log(r);
			return r && r.operation;
		})
		.reduce((acc, v) => {
			acc[v] ? (acc[v]++) : (acc[v] = 1);
			return acc;
		}, o);
	console.log(o);
	// rawData.forEach(({ text }) => {
		// console.log(text);
		// console.log(xr.exec(text, xr('(?<n>\\d+)')).n);
	// });
});
