'use client';
import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';
import authSlice from './authSlice';
import modalSlice from './modalSlice';
import loaderSlice from './loaderSlice';
import layoutSlice from './layoutSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authSlice,
		modal: modalSlice,
		layout: layoutSlice,
		loader: loaderSlice,
	},
	devTools: false,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

// call the load user function on every page load
const initializeApp = async () => {
	await store.dispatch(
		apiSlice.endpoints.getMe.initiate({}, { forceRefetch: true }),
	);
};

export type RootState = ReturnType<typeof store.getState>;

initializeApp();
