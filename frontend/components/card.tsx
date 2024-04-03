import React from 'react';
import { Flat } from '@/interfaces/apiObjects';
import { Button, Divider, Image } from 'antd';
import { LikeIcon } from './icons/icons';

export const Card = ({ data }: Props) => (
	<div className="card__container">
		<p className="t6-medium card__subtitle">
			{data.rooms ? `${data.rooms}-комнатная` : 'Студия'} {data.square} м²
		</p>
		<div className="relative w-fit">
			<p className="t3 card__title">{data.price} ₽</p>
			<p className="t11 card__old-price">
				<s>{data.old_price} ₽</s>
			</p>
		</div>
		<div className="flex justify-center">
			<Image className="card__image" src={data.image} alt="Схема квартиры" />
		</div>
		<div className="flex flex-col gap-4xxs md:gap-2">
			<div className="flex w-full justify-between">
				<p className="t10 card__field">Проект</p>
				<p className="t10">{data.project_title}</p>
			</div>
			<Divider className="card__divider" />
			<div className="flex w-full justify-between">
				<p className="t10 card__field">Этаж</p>
				<p className="t10">{data.floor}</p>
			</div>
			<Divider className="card__divider" />
			<div className="flex w-full justify-between">
				<p className="t10 card__field">Срок сдачи</p>
				<p className="t10">{data.release_dates}</p>
			</div>
			<Button
				className="card__like-button centered absolute"
				shape="circle"
				icon={<LikeIcon />}
			/>
		</div>
	</div>
);

export interface Props {
	data: Flat;
}
