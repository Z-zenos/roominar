'use client';

import clsx from 'clsx';
import {
	MdCategory,
	MdKeyboardDoubleArrowRight,
	MdOutlineExplore,
} from 'react-icons/md';
import { FaConnectdevelop } from 'react-icons/fa';
import { Input } from '@nextui-org/input';
import { CiSearch } from 'react-icons/ci';
import EventCard from '@/components/Card/EventCard';
import Category from '@/components/Category';
import Link from 'next/link';
import { PiRankingFill } from 'react-icons/pi';
import { GoOrganization } from 'react-icons/go';
import { GiMicrophone, GiPartyPopper } from 'react-icons/gi';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '@/styles/custom.module.css';

// import required modules
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import useWindowDimensions from '@/lib/hooks/useWindowDimesion';
import RankingList, { Rank } from '@/components/Ranking/RankingList';
import OrganizationCard, {
	Organization,
} from '@/components/Card/OrganizationCard';
import SpeakerCard from '@/components/Card/SpeakerCard';
import { Button } from '@nextui-org/button';
import { Image, Kbd } from '@nextui-org/react';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeadingGroupProps {
	heading: string | ReactNode;
	subheading: string;
	className?: string;
}

const HeadingGroup = ({
	heading,
	subheading,
	className,
}: HeadingGroupProps) => {
	return (
		<div className={clsx('mb-12 text-center ', className)}>
			<h2 className="text-xl text-primary font-semibold">{heading}</h2>
			<h3 className="text-xm text-gray-600 font-light">{subheading}</h3>
		</div>
	);
};

const rankingCategories: Rank[] = [
	{ rank: 1, title: 'Technology' },
	{ rank: 2, title: 'Entertainment' },
	{ rank: 3, title: 'SEducation' },
	{ rank: 4, title: 'Arena ov Valor' },
	{ rank: 5, title: 'Business' },
];

const organizations: Organization[] = [
	{ id: 1, name: 'Viettel', avatar_url: '' },
	{ id: 2, name: 'HUST', avatar_url: '' },
	{ id: 3, name: 'Theinfitech', avatar_url: '' },
	{ id: 4, name: 'VinGroup', avatar_url: '' },
	{ id: 5, name: 'Google', avatar_url: '' },
];

const rankingEvents: Rank[] = [
	{ rank: 1, title: 'World Economic Forum Annual Meeting' },
	{ rank: 2, title: 'CES (Consumer Electronics Show)' },
	{ rank: 3, title: 'Coachella Valley Music and Arts Festival' },
	{ rank: 4, title: 'Olympic Games Tokyo 2020' },
	{
		rank: 5,
		title:
			'みんなの考えた最強のデータ基盤アーキテクチャ2024前半おまとめ拡大版SP！',
	},
];

export default function Page() {
	const { width } = useWindowDimensions();
	const router = useRouter();
	const [value, setValue] = useState<string>('');

	return (
		<div>
			{/* === HERO SECTION === */}
			<section className="text-center flex items-center justify-center flex-col py-[80px]">
				<h2
					className={clsx(
						'flex justify-center items-center gap-5 italic text-lg',
					)}
				>
					<span>Explore</span>
					<MdOutlineExplore className="text-primary" />
					<span>Connect</span>
					<FaConnectdevelop className="text-primary" />
					<span>Elevate</span>
				</h2>
				<h1 className="text-hg my-5 font-semibold">
					Web(<span className="text-gradient">Sem</span>)inar &{' '}
					<span className="text-gradient">E</span>vent 2024 🎉
				</h1>
				<p className="text-primary font-semibold mb-8">
					Search site for business seminars focusing on digital and AI
					utilization
				</p>
				<span className="border-t-1 border-gray-600 border-b-1 py-1 px-4">
					🚀 | YOU&apos;VE GOT PLANS?
				</span>
				<Input
					className="max-w-[500px] mt-5"
					placeholder="Search any event you want."
					startContent={
						<CiSearch className="w-5 h-5 pointer-events-none flex-shrink-0" />
					}
					onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
						e.key === 'Enter' && router.push(`/search?name=${value}`)
					}
					value={value}
					onValueChange={setValue}
					endContent={<Kbd keys={['enter']}>Enter</Kbd>}
				/>
			</section>

			{/* === CATOGORY SECTION === */}
			<section className="px-[15%] pt-[20px]">
				<div className="flex justify-between items-end gap-2 flex-wrap-reverse">
					<div
						className={clsx(
							'mt-10',
							width > 1200 ? 'w-[40%]' : 'w-full mx-auto',
						)}
					>
						<Swiper
							key={2}
							autoplay={{
								delay: 3500,
								disableOnInteraction: false,
							}}
							freeMode={true}
							initialSlide={2}
							modules={[Autoplay, Navigation, FreeMode]}
							pagination={{
								clickable: true,
							}}
							slidesPerView={2}
							spaceBetween={30}
							wrapperClass="pb-2 mt-4"
						>
							{[17, 18, 19].map((_, index) => (
								<SwiperSlide
									key={index}
									className={clsx('dark:rounded-lg dark:p-0')}
								>
									<Image
										className="w-[300px] h-[250px]"
										src="https://avatars.githubusercontent.com/u/168013536?s=400&u=70bb0e54fe8f64dc89004de4370d33a25016a1ec&v=4"
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="h-full">
						<HeadingGroup
							className="mb-6 text-right"
							heading={
								<span className="flex justify-center gap-2 items-center text-red-500">
									Trending Category <MdCategory />
								</span>
							}
							subheading="Discover the hottest event trends and insights to level up your virtual events."
						/>
						<div className="grid grid-cols-6 gap-4 ">
							{[
								'music',
								'sport',
								'technology',
								'business',
								'golf',
								'esport',
								'life & style',
								'AI',
								'Logistics',
							].map((c) => (
								<Category key={c} title={c} />
							))}
						</div>
					</div>
				</div>
			</section>

			{/* === EVENT SECTION === */}
			<section className="py-[40px] px-[15%]">
				<HeadingGroup
					heading={
						<span className="flex justify-center gap-2 items-center text-green-500">
							Events <GiPartyPopper />
						</span>
					}
					subheading="Elevate your virtual experiences with our all-in-one webinar and event management solutions."
				/>
				<Link
					className="text-primary font-bold inline-flex justify-start gap-2 items-center cursor-pointer border-b border-b-primary pb-2"
					href="#"
				>
					Upcoming Event <MdKeyboardDoubleArrowRight size={20} />
				</Link>
				<div className="flex justify-between items-center flex-wrap gap-y-7 border-l border-l-primary">
					<Swiper
						key={4}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						freeMode={true}
						modules={[Autoplay, Navigation, FreeMode]}
						pagination={{
							clickable: true,
						}}
						slidesPerView={width > 1200 ? 4 : 2}
						spaceBetween={30}
						wrapperClass="pb-2"
					>
						{[1, 2, 3, 4, 5, 6].map((i, index) => (
							<SwiperSlide
								key={index}
								className={clsx('dark:rounded-lg dark:p-0')}
							>
								<EventCard
									direction={width > 800 ? 'vertical' : 'horizontal'}
									variant="simple"
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<Link
					className="text-warning font-bold inline-flex justify-start gap-2 items-center cursor-pointer border-b border-b-warning pb-2 mt-8"
					href="#"
				>
					Popular Event <MdKeyboardDoubleArrowRight size={20} />
				</Link>
				<div className="flex justify-between items-center flex-wrap gap-y-7 border-l border-l-warning">
					<Swiper
						key={2}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
						freeMode={true}
						modules={[Autoplay, Navigation, FreeMode]}
						pagination={{
							clickable: true,
						}}
						slidesPerView={width > 1200 ? 2 : 1}
						spaceBetween={30}
						wrapperClass="pb-2"
					>
						{[7, 8, 9].map((i, index) => (
							<SwiperSlide
								key={index}
								className={clsx('dark:rounded-lg dark:p-0')}
							>
								<EventCard direction="horizontal" variant="simple" />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>

			{/* === ORGANIZATION SECTION === */}
			<section className="px-[15%] mb-7">
				<div
					className={clsx(
						'flex flex-wrap justify-between items-start gap-10',
						width > 1200 ? 'flex-row' : 'flex-col',
					)}
				>
					<div className={clsx(width > 1200 ? 'w-[70%]' : 'w-full')}>
						<h2 className="text-xl text-primary font-semibold flex justify-start items-center gap-2">
							Organization <GoOrganization />
						</h2>
						<h3 className="text-xm text-gray-600 font-light">
							Follow us to receive the latest news from the organization.
						</h3>
						<div
							className={clsx(
								'grid items-center gap-4 mt-6 ',
								width > 1200 ? ' grid-cols-3' : ' grid-cols-2 ',
							)}
						>
							{organizations.map((org, i) => (
								<OrganizationCard key={`org-${i}`} organization={org} />
							))}
						</div>
						<div className="flex justify-between gap-2 items-center bg-info-sub mt-8 rounded-md px-10 py-8">
							<div>
								<h3 className="font-semibold text-xm text-info-main">
									Start an event with Roominar
								</h3>
								<p className="font-light opacity-75">
									Anyone can create an event page for free by creating a group.
									Why not publish an event for sharing information and
									interacting with others on Roominar?
								</p>
							</div>
							<Button
								className="mt-3 text-info-main bg-transparent border-info-main border px-10 font-bold"
								radius="sm"
								variant="flat"
							>
								Create a free event
							</Button>
						</div>
					</div>
					<div className={clsx(width > 1200 ? 'w-[25%]' : 'w-full')}>
						<h2 className="text-xl flex justify-end gap-1 items-center text-warning-main font-semibold">
							Ranking <PiRankingFill />
						</h2>
						<div className="flex gap-5 items-center justify-between overflow-x-scroll w-full pt-8">
							<RankingList data={rankingCategories} title="Category" />
						</div>
						<div className="flex gap-5 items-center justify-between overflow-x-scroll w-full pt-8">
							<RankingList data={rankingEvents} title="Events" />
						</div>
					</div>
				</div>
			</section>

			{/* === SPEAKER SECTION === */}
			<section className="pb-[40px] px-[15%]">
				<div>
					<h2 className="text-xl text-purple-main font-semibold flex justify-start items-center gap-2">
						Speaker <GiMicrophone />
					</h2>
					<h3 className="text-xm text-gray-600 font-light">
						Inspiring insights from visionary Speaker.
					</h3>
					<div className="flex gap-5 items-center justify-between mt-6 flex-wrap">
						{[10, 11, 12, 15].map((speaker, i) => (
							<SpeakerCard key={`speaker-${i}`} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
