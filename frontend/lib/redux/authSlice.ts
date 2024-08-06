import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: { token: string; user: any; expire: number } = {
	token: '',
	user: null,
	expire: 0,
};

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		signup: (
			state,
			action: PayloadAction<{ token: string; email: string; expire: number }>,
		) => {
			state.token = action.payload.token;
			state.user = action.payload.email;
			state.expire = action.payload.expire;
		},
		signin: (
			state,
			action: PayloadAction<{ accessToken: string; user: any }>,
		) => {
			state.token = action.payload.accessToken;
			state.user = action.payload.user;
		},
		signout: (state) => {
			state.token = '';
			state.user = null;
			state.expire = 0;
		},
		resetAuth: (state) => {
			state.expire = 0;
			state.token = '';
			state.user = '';
		},
	},
});

export const { signin, signout, signup, resetAuth } = authSlice.actions;

export default authSlice.reducer;
