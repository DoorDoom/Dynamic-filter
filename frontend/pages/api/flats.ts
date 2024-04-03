import { flatsServerUrl } from '@/constants/urls';
import { Error, FilterResponse } from '@/interfaces/apiObjects';
import { getRequest } from '@/services/apiService';
import { toQueryRequest } from '@/utils/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<FilterResponse | Error>,
) {
	if (req.method === 'POST') {
		const { status, data } = await getRequest(
			toQueryRequest(req.body, flatsServerUrl),
		);
		res.status(status).json(data);
	}

	return res.status(404).json({ message: 'Не найдено' });
}
