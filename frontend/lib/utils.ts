import { type ClassValue, clsx } from 'clsx';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getTotalQueryParams(searchParams: string) {
	return Object.keys(queryString.parse(searchParams)).length;
}

export function searchQuery(
	router: AppRouterInstance,
	filters: any,
	searchParams: ReadonlyURLSearchParams,
) {
	const refineQuery: { [key: string]: any } = {
		...queryString.parse(searchParams.toString()),
		...filters,
	};

	Object.keys(refineQuery).map(
		(key: string) =>
			refineQuery[key] !== 0 && !refineQuery[key] && delete refineQuery[key],
	);

	const query = queryString.stringify(refineQuery);

	router.push(`?${query}`);
}
