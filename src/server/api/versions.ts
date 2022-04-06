import { Level } from 'level';

export default async (_req, _res) => {
	const db = new Level('_versionsdata', { valueEncoding: 'json' });
	await db.open();

	try {
		/**
		 * Init return values.
		 */
		const envs = [
			'test-worker',
			'test-admin-app',
			'prod-worker',
			'prod-admin-app'
		];
		const versions = {};

		/**
		 * Get stored versions from deployments.
		 */
		const deployed = {};
		for (const env of envs) {
			try {
				deployed[env] = await db.get(env);
			} catch (_e) {
				deployed[env] = {};
			}
		}

		const gitVersions = await db.get('git');

		/**
		 * Map versions from deployments to modules.
		 */
		for (const [module, gitVersion] of Object.entries(gitVersions)) {
			versions[module] = {
				git: gitVersion
			}
			for (const env of envs) {
				versions[module][env] = deployed[env][module];
			}
		}

		return { envs, versions };
	} catch (e) {
		console.log(e);
	} finally {
		await db.close();
	}
};
