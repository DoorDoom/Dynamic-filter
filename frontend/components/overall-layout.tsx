import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

export const OverallLayout = ({ children }: Props) => (
	<ConfigProvider
		theme={{
			components: {
				Slider: {
					dotSize: 4,
					handleSize: 6,
					handleSizeHover: 6,
					handleColor: '#2495FE',
					railSize: 2,
				},
			},
			token: {
				colorTextPlaceholder: '#040306',
			},
		}}
	>
		<div className="overall-border">{children}</div>{' '}
	</ConfigProvider>
);

export interface Props {
	children: ReactNode;
}
