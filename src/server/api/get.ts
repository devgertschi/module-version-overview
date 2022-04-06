import { Level } from 'level';
import { useQuery } from 'h3';

export default async (req, _res) => {
	const db = new Level('_versionsdata', { valueEncoding: 'json' });
	await db.open();

	let value = null;

	try {
		const params = useQuery(req);
		if (params.env) {
			value = await db.get(<string>params.env);
		} else {
			value = await db.status;
		}
	} catch (e) {
		console.log(e);
	} finally {
		await db.close();
	}

	return value;
};
