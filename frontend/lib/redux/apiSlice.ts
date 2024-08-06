import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';

import { signin } from './authSlice';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1`,
		paramsSerializer: (params: Record<string, unknown>) =>
			queryString.stringify(params, { arrayFormat: 'none' }),
	}),
	endpoints: (builder) => ({
		refreshToken: builder.query({
			query: () => ({
				url: 'refresh-token',
				method: 'GET',
				credentials: 'include' as const,
			}),
		}),
		getMe: builder.query({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			query: (data: any) => ({
				url: '/users/auth/me',
				method: 'GET',
				credentials: 'include' as const,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;

					dispatch(
						signin({
							accessToken: result.data.accessToken,
							user: result.data.user,
						}),
					);
				} catch (error: any) {}
			},
		}),
	}),
});

export const { useRefreshTokenQuery, useGetMeQuery } = apiSlice;
