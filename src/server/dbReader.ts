import * as sqlite3 from 'sqlite3';
import RawMessage from './interfaces';

const handle = '900';

export default function getSMSList(file: string): IPromise<RawMessage[]> {
	return new Promise((resolve, reject) => {
		const sqlite = sqlite3.verbose();
		const db = new sqlite.Database(file);
		db.serialize(() => {
			db.all('SELECT ROWID FROM handle WHERE id = ?', '900', (err, [ handle ]) => {
				db.all('SELECT guid, text FROM message WHERE handle_id = 2', (err, rows) => {
					resolve(rows);
					db.close();
				});
			});
		});
	});
}
