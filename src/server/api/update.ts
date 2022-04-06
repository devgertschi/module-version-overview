import { Level } from 'level';
import { useBody, useMethod, useQuery } from 'h3';

export default async (req, _res) => {
	const db = new Level('_versionsdata', { valueEncoding: 'json' });
	await db.open();

	try {
		if (useMethod(req) === 'POST') {
			const params = useQuery(req);
			if (params.env) {
				const body = await useBody(req);
				if (body.dependencies) {
					await db.put(<string>params.env, body.dependencies);
				} else {
					await db.put(<string>params.env, body);
				}
			}
		}
	} catch (e) {
		console.log(e);
	} finally {
		await db.close();
	}

	return db.status;
};
