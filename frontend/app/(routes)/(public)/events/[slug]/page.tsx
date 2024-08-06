import EventDetail from '@/components/Event/EventDetail';
import Head from '@/components/Head';

async function Page({ params: { slug } }: { params: { slug: string } }) {
	return (
		<>
			<Head
				description="Detail information about specific event"
				keywords="Foreign Language,Webinar,Event,Sharing,Seminar,Ticket"
				title="Detail Event "
			/>
			<EventDetail slug={slug} />
		</>
	);
}

export default Page;
