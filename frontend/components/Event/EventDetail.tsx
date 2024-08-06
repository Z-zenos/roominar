'use client';

import clsx from 'clsx';

import { useEffect, useRef, useState } from 'react';
import { styles } from '@/config/styles';
import DotLoader from '../Loader/DotLoader';
import {
	BreadcrumbItem,
	Breadcrumbs,
	Button,
	getKeyValue,
	Image,
	Link,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';
import useWindowDimensions from '@/lib/hooks/useWindowDimesion';
import {
	FaChevronDown,
	FaChevronUp,
	FaFacebookSquare,
	FaInstagram,
	FaLinkedin,
	FaRegCopy,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Timeline from '../Timeline';
import { BsFillPeopleFill } from 'react-icons/bs';
import Badge from '../Badge';
import { IoBookmarkOutline } from 'react-icons/io5';
import { MdOutlineMail } from 'react-icons/md';
import { GoOrganization } from 'react-icons/go';
import { GiPartyPopper } from 'react-icons/gi';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '@/styles/custom.module.css';

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import SpeakerCard from '../Card/SpeakerCard';

const rows = [
	{
		key: '1',
		time: '12:30 ~ 13:00',
		title: 'Title',
		content: 'Active',
	},
	{
		key: '2',
		time: '12:30 ~ 13:00',
		title: 'Title',
		content: 'Active',
	},
	{
		key: '3',
		time: '12:30 ~ 13:00',
		title: 'Title',
		content: 'Active',
	},
	{
		key: '4',
		time: '12:30 ~ 13:00',
		title: 'Title',
		content: 'Active',
	},
];

const columns = [
	{
		key: 'time',
		label: 'TIME',
	},
	{
		key: 'content',
		label: 'CONTENT',
	},
];

interface EventDetailProps {
	slug: string;
}

function EventDetail({}: EventDetailProps) {
	// const { data, isLoading } = useGetCourseQuery(slug);
	// const course = data?.course;
	const { width } = useWindowDimensions();

	const [showMore, setShowMore] = useState<boolean>(false);
	const [isCopied, setIsCopied] = useState<boolean>(false);
	const [isFollowed, setIsFollowed] = useState<boolean>(false);

	const sectionNavigationMenuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(({ target, isIntersecting }) => {
					if (target === sectionNavigationMenuRef.current) {
						return isIntersecting;

						// dispatch(
						// 	displaySubHeader({
						// 		open: !isIntersecting,
						// 		data: isIntersecting
						// 			? undefined
						// 			: {
						// 					menu: [
						// 						{ name: 'Description', id: 'description-section' },
						// 						{ name: 'Reviews', id: 'reviews-section' },
						// 						{ name: 'FAQ', id: 'faq-section' },
						// 					],
						// 				},
						// 		addons: ['menu'],
						// 	}),
						// );
					}
				});
			},
			{
				threshold: 0.5,
			},
		);

		if (sectionNavigationMenuRef.current) {
			observer.observe(sectionNavigationMenuRef.current);
		}

		return () => {
			observer.disconnect();
		};
	});

	useEffect(() => {
		setTimeout(() => setIsCopied(false), 30000);
	}, [isCopied]);

	return false ? (
		<DotLoader />
	) : (
		<div className="w-full">
			<div
				className={clsx(
					'bg-emerald-50 dark:bg-dark-sub w-full py-14 px-[15%] relative flex-wrap',
					styles.between,
				)}
			>
				<div
					className={clsx(
						'flex flex-col gap-7',
						width > 1200 ? 'w-[70%]' : 'w-full mb-8',
					)}
				>
					<div className="flex flex-col flex-wrap gap-4 ">
						<Breadcrumbs color="primary">
							<BreadcrumbItem className="hover:underline">Home</BreadcrumbItem>
							<BreadcrumbItem className="hover:underline">Music</BreadcrumbItem>
							<BreadcrumbItem>Song</BreadcrumbItem>
						</Breadcrumbs>
					</div>
					<h2 className="text-primary font-bold text-lg">
						Viewing the stunning pink and white cherry blossoms in full bloom
					</h2>
					<Image
						src="https://s3.techplay.jp/tp-images/event/213554109a7a983ba7e40f3a64b1d623638bfdbc.png?w=1200"
						className="w-full "
					/>
					<div className={clsx(styles.flexStart)}>
						<Badge title="AI" />
						<Badge title="System Architecture" />
						<Badge title="History" />
						<Badge title="Medicine" />
					</div>
				</div>
				<div className={clsx(width > 1200 ? 'w-[25%]' : 'w-full')}>
					<div
						className={clsx(
							'bg-white shadow-sm border p-4 border-gray-100 rounded-md flex items-center gap-6',
							width > 1200 ? 'flex-col' : 'flex-row justify-between',
						)}
					>
						<div>
							<h4 className="text-green-500 font-semibold text-md">
								Social Media Share{' '}
							</h4>
							<div
								className={clsx(styles.between, 'mt-4 [&>*]:cursor-pointer')}
							>
								<FaFacebookSquare size={24} className="text-[#0862f6]" />
								<FaXTwitter size={24} className="text-[]" />
								<FaInstagram size={24} className="text-orange-400" />
								<FaLinkedin size={24} className="text-[#0073af]" />
							</div>
							<div className={clsx(styles.between, 'gap-2 mt-3')}>
								<Button
									variant="bordered"
									className="w-full"
									color="default"
									onClick={() => {
										navigator.clipboard.writeText(location.href);
										setIsCopied(true);
									}}
									radius="sm"
								>
									<FaRegCopy /> {isCopied ? 'Copied' : 'Copy'} URL
								</Button>
								<Button
									isIconOnly
									color="primary"
									variant="bordered"
									radius="sm"
								>
									<IoBookmarkOutline size={16} />
								</Button>
							</div>
						</div>

						<div>
							<div
								className={clsx(
									styles.flexStart,
									'border-y border-y-gray-500 py-4',
								)}
							>
								<BsFillPeopleFill className="text-primary w-6 h-6" />
								<span className="font-light">123 applied / 1231</span>
							</div>
							<Button
								color="primary"
								className="my-3 mx-auto w-[160px] font-semibold"
								radius="none"
							>
								Apply Now
							</Button>
						</div>

						<Link
							className={clsx(styles.between, 'text-primary gap-2')}
							href="#"
							underline="hover"
						>
							<MdOutlineMail size={20} />
							Ask about this event
						</Link>
					</div>
				</div>
			</div>

			<div
				className={clsx(
					'dark:bg-dark-sub w-full py-14 px-[15%] relative flex-wrap flex justify-between items-start',
				)}
			>
				<div
					className={clsx(
						'flex flex-col gap-7',
						width > 1200 ? 'w-[70%]' : 'w-full mb-8',
					)}
				>
					{/* === Timeline === */}
					<div>
						<h3 className="font-semibold text-lg border-b border-b-gray-400">
							General Timeline
						</h3>

						<Timeline />
					</div>

					{/* === LOCATION === */}
					<div>
						<h3 className="font-semibold text-lg ">Offline address</h3>
						<div className="mt-3">
							<p className="font-light">
								Trung tâm Tiệc cưới Louis Palace (Km 5+200 Lê Trọng Tấn kéo
								dài), An Khánh, Hoài Đức, Hà Nội Hà Nội Hanoi, Hanoi 100000
							</p>
							<Link
								className={styles.flexStart}
								href="#"
								underline="hover"
								onClick={() => {}}
							>
								Show map <FaChevronDown />
							</Link>
						</div>
					</div>

					{/* === DESCRIPTION === */}
					<div>
						<h3 className="font-semibold text-lg border-b border-b-gray-400">
							About this event
						</h3>
						<div className="mt-3">
							<p
								className={clsx(
									'font-light',
									showMore
										? 'h-auto'
										: 'h-[400px] overflow-hidden gradient-mask-b-0',
								)}
							>
								a
							</p>
							<Button
								color="primary"
								className={clsx('flex justify-start items-center gap-2 mt-3')}
								onClick={() => setShowMore(!showMore)}
							>
								Show more {!showMore ? <FaChevronDown /> : <FaChevronUp />}
							</Button>
						</div>
					</div>

					{/* === Detail Schedule === */}
					<div>
						<h3 className="font-semibold text-lg border-b border-b-gray-400">
							Detail Schedule
						</h3>
						<div className="mt-3">
							<Table aria-label="Example table with dynamic content">
								<TableHeader columns={columns}>
									{(column) => (
										<TableColumn
											key={column.key}
											className={clsx(column.key === 'content' && 'w-2/3')}
										>
											{column.label}
										</TableColumn>
									)}
								</TableHeader>
								<TableBody items={rows}>
									{(item) => (
										<TableRow key={item.key}>
											{(columnKey) => (
												<TableCell>
													<p>{getKeyValue(item, columnKey)}</p>
												</TableCell>
											)}
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					</div>

					{/* === Refund Policy === */}
					<div>
						<h3 className="font-semibold text-lg ">Refund Policy</h3>
						<div className="mt-3">
							<p className="font-light">No refund policy</p>
						</div>
					</div>

					{/* === Speaker === */}
					<div>
						<h3 className="font-semibold text-lg border-b border-b-gray-400">
							Speaker
						</h3>

						<div className="flex gap-5 items-center justify-start mt-6 flex-wrap">
							{[10, 11, 12, 15].map((speaker, i) => (
								<SpeakerCard key={`speaker-${i}`} className="max-w-[250px]" />
							))}
						</div>
					</div>
				</div>
				<div
					className={clsx(width > 1200 ? 'w-[25%]' : 'w-full', 'self-start')}
				>
					<div>
						<h3
							className={clsx(
								styles.flexStart,
								'gap-2 text-lg font-semibold text-primary',
							)}
						>
							<GoOrganization />
							Organization
						</h3>
						<div className="mt-3 border border-gray-200 shadow-sm">
							<div className="h-[100px] overflow-hidden">
								<Image
									src="https://s3.techplay.jp/tp-images/event/325af0ba401e01b931e280d2c9bf4030d7c9e718.png?w=600"
									className="w-full h-[200px]"
								/>
							</div>
							<div className={clsx(styles.between, 'px-5')}>
								<div className="border p-1 border-blue-500 rounded-sm -mt-10">
									<Image
										src="https://avatars.githubusercontent.com/u/168013536?s=400&u=70bb0e54fe8f64dc89004de4370d33a25016a1ec&v=4"
										width={80}
										height={80}
										className="rounded-sm"
									/>
								</div>
								<div className="text-right mt-3">
									<Button
										className={
											isFollowed
												? 'bg-transparent text-foreground border-default-200'
												: ''
										}
										color="primary"
										radius="none"
										size="sm"
										variant={isFollowed ? 'bordered' : 'solid'}
										onPress={() => setIsFollowed(!isFollowed)}
									>
										{isFollowed ? 'Unfollow' : 'Follow'}
									</Button>
									<p className="mt-2">
										<span className="underline font-medium text-sm text-red-500 mr-2">
											1231
										</span>
										<span className="font-light opacity-80 text-sm">
											Follower
										</span>
									</p>
								</div>
							</div>
							<div className="my-3 px-5">
								<h3 className="font-semibold text-primary text-md cursor-pointer">
									Tech play
								</h3>
								<p className="opacity-70 text-ss line-clamp-3">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Cumque exercitationem illum veritatis quis dicta. Laboriosam a
									minus aliquam amet, iure velit sunt nemo voluptatem labore
									dolores quo incidunt fugiat in!
								</p>

								<h3 className="font-semibold text-gray-700 text-nm cursor-pointer my-3">
									Events
								</h3>
								<div className="flex justify-start gap-3 items-start">
									<Image
										src="https://avatars.githubusercontent.com/u/168013536?s=400&u=70bb0e54fe8f64dc89004de4370d33a25016a1ec&v=4"
										className="min-w-[100px] rounded-md h-[70px]"
									/>
									<div>
										<h3 className="font-medium text-nm">
											This is event title of AI conferenece of win champion if
											asf.
										</h3>
										<p className="text-ss font-light opacity-65">
											Start at 2024/12/12
										</p>
									</div>
								</div>

								<div className="flex justify-start gap-3 items-start my-3">
									<Image
										src="https://avatars.githubusercontent.com/u/168013536?s=400&u=70bb0e54fe8f64dc89004de4370d33a25016a1ec&v=4"
										className="min-w-[100px] rounded-md h-[70px]"
									/>
									<div>
										<h3 className="font-medium text-nm">
											This is event title of AI conferenece of win champion if
											asf.
										</h3>
										<p className="text-ss font-light opacity-65">
											Start at 2024/12/12
										</p>
									</div>
								</div>

								<div className="flex justify-start gap-3 items-start">
									<Image
										src="https://avatars.githubusercontent.com/u/168013536?s=400&u=70bb0e54fe8f64dc89004de4370d33a25016a1ec&v=4"
										className="min-w-[100px] rounded-md h-[70px]"
									/>
									<div>
										<h3 className="font-medium text-nm">
											This is event title of AI conferenece of win champion if
											asf.
										</h3>
										<p className="text-ss font-light opacity-65">
											Start at 2024/12/12
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div>
						<h3
							className={clsx(
								styles.flexStart,
								'gap-2 text-lg font-semibold text-orange-500 mt-5',
							)}
						>
							<GiPartyPopper />
							Related Events
						</h3>

						<Swiper
							key={1}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false,
							}}
							freeMode={true}
							modules={[Autoplay, Pagination, FreeMode]}
							pagination={{
								clickable: true,
							}}
							slidesPerView={1}
							spaceBetween={30}
							wrapperClass="pb-2"
						>
							{[1, 2, 3].map((i, index) => (
								<SwiperSlide
									key={index}
									className={clsx('dark:rounded-lg dark:p-0')}
								>
									<div className="mt-3 border border-gray-200 shadow-sm p-2">
										<Image
											src="https://s3.techplay.jp/tp-images/event/325af0ba401e01b931e280d2c9bf4030d7c9e718.png?w=600"
											className="w-full h-[200px]"
										/>
										<div className="pt-3 px-1">
											<h3 className="text-md">Careeror Feaasfh Pas 12312</h3>
											<p className="text-ss font-light opacity-65">
												Start at 2012/12/12
											</p>
										</div>
									</div>

									<div className="mt-3 border border-gray-200 shadow-sm p-2">
										<Image
											src="https://s3.techplay.jp/tp-images/event/325af0ba401e01b931e280d2c9bf4030d7c9e718.png?w=600"
											className="w-full h-[200px]"
										/>
										<div className="pt-3 px-1">
											<h3 className="text-md">Careeror Feaasfh Pas 12312</h3>
											<p className="text-ss font-light opacity-65">
												Start at 2012/12/12
											</p>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventDetail;
