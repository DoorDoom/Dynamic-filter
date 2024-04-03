import { FilterResponse } from '@/interfaces/apiObjects';
import {
	ButtonOption,
	SelectOption,
	queryBody,
} from '@/interfaces/componentsObjects';
import { ParsedUrlQuery } from 'querystring';

export const getProjects = (data: FilterResponse) => {
	const projects = (data as FilterResponse).data.projects.map(
		elem =>
			({
				value: elem.id,
				label: elem.title,
				disabled: elem.disabled,
			}) as SelectOption,
	);
	return projects;
};

export const isEmpty = (obj: Object) => Object.keys(obj).length === 0;

export const getRooms = (data: FilterResponse) =>
	(data as FilterResponse).data.rooms.map(
		el =>
			({
				value: el.number,
				active: el.is_active,
				label: el.number !== 0 ? `${el.number}к` : `Ст`,
				disabled: el.disabled,
			}) as ButtonOption,
	);

export const toQueryRequest = (data: any, url: string) => {
	const str = data
		? Object.entries(data)
				.map(elem => `${elem[0]}=${elem[1]}`)
				.join('&')
		: '';
	return str !== '' ? `${url}?${str}` : url;
};
