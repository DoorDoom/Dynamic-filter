import { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { FlatsResponse, Flat } from '@/interfaces/apiObjects';
import { postRequest } from '@/services/apiService';
import { flatsClientUrl } from '@/constants/urls';
import { OverallLayout } from '@/components/overall-layout';
import { queryBody } from '@/interfaces/componentsObjects';
import { Button, Drawer } from 'antd';
import { Card } from '@/components/card';
import { FilterIcon } from '@/components/icons/icons';
import { CloseCircleFilled } from '@ant-design/icons';
import { Filter } from '../components/filter';

const HomePage: NextPage = () => {
	const [result, setResult] = useState<Flat[] | null>(null);
	const [total, setTotal] = useState<number>(0);
	const [query, setQuery] = useState<queryBody>({ per_page: 6 });
	const [tempQuery, setTempQuery] = useState<queryBody>({ per_page: 6 });
	const [open, setOpen] = useState(false);

	const getFlats = async (bodyRequest: queryBody) => {
		try {
			const { status, data } = await postRequest(flatsClientUrl, bodyRequest);
			if (status === 200) {
				setTotal((data as FlatsResponse).meta.total);
				setResult((data as FlatsResponse).data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useMemo(() => {
		getFlats(query);
	}, [query]);

	return (
		<OverallLayout>
			<h4>Планировки</h4>
			<Button
				className="more-btn centered mt-10 block md:hidden"
				icon={<FilterIcon />}
				onClick={() => setOpen(true)}
			>
				Фильтр
			</Button>
			<Filter
				onChange={newQuery => {
					setQuery({ ...newQuery, per_page: 6 });
				}}
				total={total}
				className="hidden md:block"
			/>
			<div className="list">
				{result?.map(elem => <Card key={`card${elem.id}`} data={elem} />)}
			</div>
			<div className="centered pt-10 md:pt-16">
				<Button
					className={`more-btn hidden md:block ${result?.length === total ? 'md:hidden' : ''}`}
					onClick={() =>
						setQuery(prev => ({ ...prev, per_page: +prev.per_page + 15 }))
					}
				>
					Показать еще 15 из {total}
				</Button>
				<Button
					className={`more-btn block md:hidden ${result?.length === total ? 'hidden' : ''}`}
					onClick={() =>
						setQuery(prev => ({ ...prev, per_page: +prev.per_page + 4 }))
					}
				>
					Показать еще 4 из {total}
				</Button>
			</div>
			<Drawer rootClassName="drawer" open={open} size="large">
				<CloseCircleFilled
					className="drawer__close"
					onClick={() => setOpen(false)}
				/>
				<h4 className="mt-6">Фильтр</h4>
				<Filter
					onChange={newQuery => {
						setTempQuery({ ...newQuery, per_page: 6 });
					}}
					total={total}
					className=""
				/>
				<Button
					className="drawer__apply"
					onClick={() => {
						setQuery({ ...query, ...tempQuery });
						setOpen(false);
					}}
				>
					Смотреть квартиры
				</Button>
			</Drawer>
		</OverallLayout>
	);
};

export default HomePage;
