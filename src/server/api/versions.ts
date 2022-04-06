import { Level } from 'level';

export default async (_req, _res) => {
	const db = new Level('_versionsdata', { valueEncoding: 'json' });
	await db.open();

	const versions = {
		git: null,
		'test-worker': null,
		'test-admin-app': null,
		'prod-worker': null,
		'prod-admin-app': null
	};

	try {
		for (const env of Object.keys(versions)) {
			try {
				versions[env] = await db.get(env);
			} catch (_e) {
				versions[env] = {};
			}
		}
	} catch (e) {
		console.log(e);
	} finally {
		await db.close();
	}

	return versions;
};
