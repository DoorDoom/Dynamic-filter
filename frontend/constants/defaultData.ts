import {
	ButtonOption,
	ShortSliderOption,
	SliderOption,
} from '@/interfaces/componentsObjects';

export const defaultButtons: ButtonOption[] = [
	{
		value: 0,
		active: false,
		label: 'Ст',
		disabled: false,
	},
	{
		value: 1,
		active: false,
		label: '1к',
		disabled: false,
	},
	{
		value: 2,
		active: false,
		label: '2к',
		disabled: false,
	},
	{
		value: 3,
		active: false,
		label: '3к',
		disabled: false,
	},
	{
		value: 4,
		active: false,
		label: '4к',
		disabled: false,
	},
];

export const defaultSlide: SliderOption = {
	min: 0,
	currentMin: 0,
	max: Number.MAX_VALUE,
	currentMax: Number.MAX_VALUE,
};

export const defaultShortSlide: ShortSliderOption = {
	min: 0,
	max: Number.MAX_VALUE,
};
