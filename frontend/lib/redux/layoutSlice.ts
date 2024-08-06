import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
	name: 'layout',
	initialState: <{ isSubHeaderVisible: boolean; data: any; addons: string[] }>{
		isSubHeaderVisible: false,
		data: undefined,
		addons: [],
	},
	reducers: {
		displaySubHeader: (
			state,
			action: PayloadAction<{ open: boolean; data: any; addons: string[] }>,
		) => {
			state.isSubHeaderVisible = action.payload.open;
			state.data = action.payload.data;
			state.addons = action.payload.addons;
		},
	},
});

export const { displaySubHeader } = layoutSlice.actions;
export default layoutSlice.reducer;
