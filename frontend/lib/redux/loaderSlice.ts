import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
	name: 'modal',
	initialState: {
		loading: false,
	},
	reducers: {
		startLoader: (state) => {
			state.loading = true;
		},
		stopLoader: (state) => {
			state.loading = false;
		},
	},
});

export const { startLoader, stopLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
