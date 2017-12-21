import * as path from 'path';
import * as fs from 'fs';

const smsArchiveName = '3d0d7e5fb2ce288813306e4d4636395e047a3d28';

export function findSMSBackup() {
	const rootBackupDir = path.join(process.env['HOME'], 'Library/Application Support/MobileSync/Backup');
	const backupDirs = fs.readdirSync(rootBackupDir)
		.map(f => path.join(rootBackupDir, f))
		.filter(f => fs.statSync(f).isDirectory());
	if (backupDirs.length === 0) {
		throw new Error('No backup dirs found');
	}
	if (backupDirs.length > 1) {
		throw new Error('More than 1 backup dir found. Need to resolve');
	}
	const backupDir = backupDirs[0];
	const backupFile = path.join(backupDir, '3d', smsArchiveName);
	try {
		fs.statSync(backupFile);
	} catch(e) {
		throw new Error('No backup file found');
	}
	return backupFile;
}
