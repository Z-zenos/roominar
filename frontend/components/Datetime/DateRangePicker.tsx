'use client';

import * as React from 'react';
import { format } from 'date-fns';

import { IoArrowDownOutline, IoArrowForward } from 'react-icons/io5';
import { HTMLAttributes } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import useWindowDimensions from '@/lib/hooks/useWindowDimesion';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { cn } from '@/lib/utils';
import Button from '../Button/Button';
import { Calendar } from './Calendar';

export interface DateRangePickerProps extends HTMLAttributes<HTMLDivElement> {
	daterange?: DateRange;
	onDateRangeChange?: SelectRangeEventHandler;
}

export function DateRangePicker({
	daterange,
	className,
	onDateRangeChange,
}: DateRangePickerProps) {
	const { width } = useWindowDimensions();

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="daterange"
						outline={true}
						className={cn(
							'justify-start text-left font-normal',
							!daterange && 'text-muted-foreground',
						)}
					>
						{daterange?.from ? (
							daterange.to ? (
								<span className="flex 1000px:flex-row flex-col 1000px:text-sm text-xs">
									<span className="block">
										{format(daterange.from, 'LLL dd, y')}
									</span>
									{width < 1000 ? (
										<IoArrowDownOutline className="inline w-3 h-3 mx-auto" />
									) : (
										<IoArrowForward className="inline mx-2 w-5 h-5" />
									)}

									<span className="block">
										{format(daterange.to, 'LLL dd, y')}
									</span>
								</span>
							) : (
								format(daterange.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={daterange?.from}
						selected={daterange}
						onSelect={onDateRangeChange}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
