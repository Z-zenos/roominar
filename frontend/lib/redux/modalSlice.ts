import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		loginUser: false,
		registerUser: false,
	},
	reducers: {
		openModal: (state, action: PayloadAction<{ type: string }>) => {
			const type = action.payload.type;

			if (type === 'loginUser') state.loginUser = true;
			else if (type === 'registerUser') state.registerUser = true;
		},
		closeModal: (state, action: PayloadAction<{ type: string }>) => {
			const type = action.payload.type;

			if (type === 'loginUser') state.loginUser = false;
			else if (type === 'registerUser') state.registerUser = false;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
