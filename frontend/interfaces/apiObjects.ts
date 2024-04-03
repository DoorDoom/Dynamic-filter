export type Error = {
	message: string;
};

export interface ResponseInfo {
	status: number;
	data: any;
}

export interface FilterResponse {
	data: Data;
}

export interface Data {
	projects: Project[];
	rooms: Room[];
	price: Price;
	square: Square;
}

export interface Project {
	id: number;
	title: string;
	is_active: boolean;
	disabled: boolean;
}

export interface Room {
	number: number;
	is_active: boolean;
	disabled: boolean;
}

export interface Price {
	min_range: number;
	max_range: number;
	min: number;
	max: number;
}

export interface Square {
	min_range: number;
	max_range: number;
	min: number;
	max: number;
}

export interface FlatsResponse {
	data: Flat[];
	links: Links;
	meta: Meta;
}

export interface Flat {
	id: number;
	project_title: string;
	rooms: number;
	studio: boolean;
	price: string;
	old_price: string;
	square: string;
	release_dates: string;
	floor: string;
	image: string;
}

export interface Links {
	first: string;
	last: string;
	prev: any;
	next: string;
}

export interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: Link[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

export interface Link {
	url?: string;
	label: string;
	active: boolean;
}
