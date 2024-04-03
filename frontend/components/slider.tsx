import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';
import { SliderOption } from '@/interfaces/componentsObjects';
import { defaultSlide } from '@/constants/defaultData';

export const CustomSlider = ({
	max,
	min,
	onChange,
	refresh,
}: Props) => {
	const [state, setState] = useState<SliderOption>(defaultSlide);

	useEffect(() => {
		if(refresh){
			setState({
				max,
				min,
				currentMax: max,
				currentMin: min,
			})
		}
		else{
			setState(prev => ({
				max,
				min,
				currentMax:
					prev.currentMax >= max || prev.currentMax >= prev.max
						? max
						: prev.currentMax,
				currentMin:
					prev.currentMin <= min || prev.currentMin <= prev.min
						? min
						: prev.currentMin,
			}));
		}

	}, [min, max, refresh]);

	const minRestriction = (value: number) => {
		if(value < state.min){
			setState(prev => ({ ...prev, currentMin: state.min }))
			return;
		}
		if(value > state.currentMax){
			setState(prev => ({
				...prev,
				currentMin: prev.currentMax,
				currentMax: value > state.max ? state.max : value,
			}))
		}else{
			setState(prev => ({ ...prev, currentMin: value }));
		}
		
	};

	const maxRestriction = (value: number) => {
		if(value > state.max){
			setState(prev => ({ ...prev, currentMax: state.max }));
			return
		}
		if(value < state.currentMin){
			setState(prev => ({
				...prev,
				currentMax: prev.currentMin,
				currentMin: value < state.min ? state.min : value,
			}))
		}else{
			setState(prev => ({ ...prev, currentMax: value }));
		}
	};

	return (
		<div className="filter-slider">
			<div className="filter-slider__field">
				<div className="flex">
					от&nbsp;
					<input
						type="text"
						className="w-[90%]"
						value={state.currentMin}
						onChange={event => minRestriction(+event.target.value)}
						onBlur={() => onChange(state.currentMin, state.currentMax)}
					/>
				</div>
				<div className="filter-slider__dash" />
				<div className="flex justify-end">
					до&nbsp;
					<input
						type="text"
						className="w-[90%]"
						value={state.currentMax}
						onChange={event => maxRestriction(+event.target.value)}
						onBlur={() => onChange(state.currentMin, state.currentMax)}
					/>
				</div>
			</div>
			<div className="filter-slider__slider">
				<Slider
					range
					min={state.min}
					max={state.max}
					value={[state.currentMin, state.currentMax]}
					onChange={value =>
						setState(prev => ({
							...prev,
							currentMin: value[0],
							currentMax: value[1],
						}))
					}
					onChangeComplete={value => {
						onChange(value[0], value[1]);
					}}
				/>
			</div>
		</div>
	);
};

export interface Props {
	onChange: (min: number, max: number) => void;
	min: number;
	max: number;
	refresh?: boolean;
}

CustomSlider.defaultProps ={
	refresh:false
}
