import { apiSlice } from './apiSlice';
import { signin, signout, signup } from './authSlice';

type RegisterUserResponse = {
	status: string;
	message: string;
	activationToken: string;
	email: string;
	expire: number;
};

type RegisterUserData = {};

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// endpoints here
		audRegister: builder.mutation<RegisterUserResponse, RegisterUserData>({
			query: (data) => ({
				url: '/users/auth/registration',
				method: 'POST',
				body: data,
				credentials: 'include' as const,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;

					dispatch(
						signup({
							token: result.data.activationToken,
							email: result.data.email,
							expire: result.data.expire,
						}),
					);
				} catch (error: any) {
					// eslint-disable-next-line no-console
					console.log(error);
				}
			},
		}),
		audActivate: builder.mutation({
			query: ({ activationToken, activationCode }) => ({
				url: '/users/auth/account-activation',
				method: 'POST',
				body: {
					activationToken,
					activationCode,
				},
			}),
		}),
		audLogin: builder.mutation({
			query: ({ email, password, rememberMe }) => ({
				url: '/users/auth/login',
				method: 'POST',
				body: {
					email,
					password,
					rememberMe,
				},
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
				} catch (error: any) {
					// eslint-disable-next-line no-console
					console.log(error);
				}
			},
		}),
		socialAuth: builder.mutation({
			query: ({ email, name, avatar, firstName, lastName }) => ({
				url: '/users/auth/social-auth',
				method: 'POST',
				body: {
					email,
					name,
					avatar,
					firstName,
					lastName,
				},
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
				} catch (error: any) {
					// eslint-disable-next-line no-console
					console.log(error);
				}
			},
		}),
		audLoggout: builder.query({
			query: () => ({
				url: '/users/auth/logout',
				method: 'POST',
				credentials: 'include' as const,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					await queryFulfilled;
					dispatch(signout());
				} catch (error: any) {
					// eslint-disable-next-line no-console
					console.log(error);
				}
			},
		}),
	}),
});

export const {
	useAudLoginMutation,
	useAudActivateMutation,
	useAudLoggoutQuery,
	useAudRegisterMutation,
	useSocialAuthMutation,
} = authApi;
