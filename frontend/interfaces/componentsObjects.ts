export interface SelectOption {
	value: number;
	label: string;
	disabled: boolean;
}

export interface ButtonOption {
	value: number;
	active: boolean;
	label: string;
	disabled: boolean;
}

export interface SliderOption {
	min: number;
	currentMin: number;
	max: number;
	currentMax: number;
}

export interface ShortSliderOption {
	min: number;
	max: number;
}

export type queryBody = { [key: string]: string | number | string[] };
