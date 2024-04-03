import React from 'react';
import { Select } from 'antd';
import { SelectOption } from '@/interfaces/componentsObjects';

export const CustomSelect = ({ onChange, projects, value }: Props) => (
	<div id="filterSelect">
		<Select
			placeholder="Все"
			optionFilterProp="children"
			filterOption={(input, option) => (option?.label ?? '').includes(input)}
			filterSort={(optionA, optionB) =>
				(optionA?.label ?? '')
					.toLowerCase()
					.localeCompare((optionB?.label ?? '').toLowerCase())
			}
			value={value}
			options={projects}
			onChange={onChange}
		/>
	</div>
);

export interface Props {
	projects: SelectOption[];
	onChange: (value: number) => void;
	value: number;
}
