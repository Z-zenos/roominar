'use client';

import Head from '@/components/Head';
import SearchEvent from '@/components/Search/SearchEvent';
import { Tabs } from '@/components/Tabs';
import Text from '@/components/Typography/Text';
import { FC } from 'react';

interface Props {}

const Page: FC<Props> = () => {
	return (
		<>
			<Head
				title="Roominar"
				description="Roominar help you to search all concerned event you like"
				keywords="Filter,search,event,seminar,webinar"
			/>
			<Tabs
				defaultValue="events"
				tabs={[
					{ value: 'events', content: <SearchEvent /> },
					{
						value: 'organizations',
						content: (
							<Text className="py-[10%] text-center" content="Coming soon." />
						),
					},
					{
						value: 'speacker',
						content: (
							<Text className="py-[10%] text-center" content="Coming soon." />
						),
					},
				]}
				className="1600px:px-[20%] px-[15%]"
			/>
		</>
	);
};

export default Page;
