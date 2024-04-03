import React from 'react';
import Icon from '@ant-design/icons';
import Like from '@/public/images/like.svg';
import Filter from '@/public/images/filter.svg';
import type { GetProps } from 'antd';

type CustomIconComponentProps = GetProps<typeof Icon>;

export const LikeIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={Like} {...props} />
);

export const FilterIcon = (props: Partial<CustomIconComponentProps>) => (
	<Icon component={Filter} {...props} />
);
