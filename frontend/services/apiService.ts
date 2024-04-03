import { queryBody } from '@/interfaces/componentsObjects';

export async function getRequest(url: string) {
	const result = await fetch(url, {
		method: 'GET',
	});
	return await { status: result.status, data: await result.json() };
}

const headers = {
	'Content-Type': 'application/json',
};

export async function postRequest(url: string, body: queryBody) {
	const result = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: headers,
	});
	return await { status: result.status, data: await result.json() };
}
