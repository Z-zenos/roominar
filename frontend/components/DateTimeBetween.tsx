'use client';

import { styles } from '@/config/styles';
import clsx from 'clsx';
import { format } from 'date-fns/format';
import { useMemo } from 'react';

interface DateTimeBetweenProps {
	start: Date;
	end: Date;
	direction?: 'horizontal' | 'vertical';
}

function DateTimeBetween({
	start,
	end,
	direction = 'horizontal',
}: DateTimeBetweenProps) {
	const formattedStart = useMemo(
		() => format(start, `yyyy MMM d - HH:MM`),
		[start],
	);
	const formattedEnd = useMemo(() => format(end, `yyyy MMM d - HH:MM`), [end]);

	return (
		<div
			className={clsx(
				styles.between,
				'flex-wrap font-light',
				direction === 'vertical' && 'flex-col ',
			)}
		>
			{formattedStart}
			<span className="text-red-500 mx-2 text-nm">〜</span>
			{formattedEnd}
		</div>
	);
}

export default DateTimeBetween;
