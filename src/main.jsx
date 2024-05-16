import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import EmptyTodo from "./pages/EmptyTodo.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<Home />} />
			<Route path="login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
	// </React.StrictMode>
);
