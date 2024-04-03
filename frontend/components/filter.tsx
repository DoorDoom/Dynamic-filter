import React, { useEffect, useState } from 'react';
import { Button, Divider } from 'antd';

import { RedoOutlined } from '@ant-design/icons';
import { postRequest } from '@/services/apiService';
import { filtersClientUrl } from '@/constants/urls';
import {
	ButtonOption,
	SelectOption,
	ShortSliderOption,
	queryBody,
} from '@/interfaces/componentsObjects';
import { FilterResponse } from '@/interfaces/apiObjects';
import { getProjects, getRooms, isEmpty } from '@/utils/utils';
import { defaultButtons, defaultShortSlide } from '@/constants/defaultData';
import { CustomSelect } from './select';
import { CustomSlider } from './slider';

export const Filter = ({ onChange, total, className }: Props) => {
	const [projectFilter, setProjectFilter] = useState<SelectOption[] | null>(
		null,
	);
	const [roomFilter, setRoomFilter] = useState<ButtonOption[]>(defaultButtons);
	const [priceFilter, setPriceFilter] =
		useState<ShortSliderOption>(defaultShortSlide);
	const [squareFilter, setSquareFilter] =
		useState<ShortSliderOption>(defaultShortSlide);
	const [query, setQuery] = useState<queryBody>({});

	const getFilter = async (requestBody: queryBody) => {
		const { status, data } = await postRequest(filtersClientUrl, requestBody);
		if (status === 200) {
			const result = data as FilterResponse;
			setProjectFilter(getProjects(result));
			setRoomFilter(getRooms(result));
			setPriceFilter({
				min: result.data.price.min,
				max: result.data.price.max,
			});
			setSquareFilter({
				min: result.data.square.min,
				max: result.data.square.max,
			});
		}
	};

	useEffect(() => {
		onChange(query);
		getFilter(query);
	}, [query]);

	return (
		<div className={className}>
			<div className="filter__container">
				<div className="filter__item">
					<p className="filter__subtitle">Проект</p>
					<CustomSelect
						onChange={value =>
							setQuery(prev => ({ ...prev, 'f[projects][]': value }))
						}
						projects={projectFilter ?? []}
						value={query['f[projects][]'] as number}
					/>
				</div>
				<div className="filter__item">
					<p className="filter__subtitle">Укажите количество комнат</p>
					<div id="flat-btns" className="filter__inner-container">
						{roomFilter
							?.sort((a, b) => a.value - b.value)
							.map(elem => (
								<Button
									key={`room${elem.value}`}
									className={elem.active ? ' active' : ''}
									disabled={elem.disabled}
									onClick={() => {
										setQuery(prev => ({ ...prev, 'f[rooms][]': elem.value }));
									}}
								>
									{elem.label}
								</Button>
							))}
					</div>
				</div>
				<div className="filter__item">
					<p className="filter__subtitle">Стоимость</p>
					<div>
						<CustomSlider
							min={priceFilter.min}
							max={priceFilter.max}
							onChange={(min, max) =>
								setQuery(prev => ({
									...prev,
									'f[price][min]': min,
									'f[price][max]': max,
								}))
							}
							refresh={isEmpty(query)}
						/>
					</div>
				</div>
				<div className="filter__item">
					<p className="filter__subtitle">Задайте площадь, м²</p>
					<div>
						<CustomSlider
							min={squareFilter.min}
							max={squareFilter.max}
							onChange={(min, max) =>
								setQuery(prev => ({
									...prev,
									'f[square][min]': min,
									'f[square][max]': max,
								}))
							}
							refresh={isEmpty(query)}
						/>
					</div>
				</div>
			</div>
			<div className="filter__result">
				Найдено {total} квартир
				<div className="absolute right-0 top-0">
					<Button
						id="refreashing"
						icon={<RedoOutlined className="h-3 w-3 rotate-180" />}
						onClick={() => {
							setQuery({});
						}}
					>
						Очистить всё
					</Button>
				</div>
			</div>
			<Divider className="mt-16 hidden md:block" />
		</div>
	);
};

export interface Props {
	onChange: (query: queryBody) => void;
	total: number;
	className: string;
}
