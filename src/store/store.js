import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import todoReducer from "./todoSlice";

const store = configureStore({
	reducer: {
		authReducer,
		todoReducer,
	},
});

export default store;