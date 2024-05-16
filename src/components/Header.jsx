import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import Logout from "./Logout";
import { login as authLogin } from "../store/authSlice";
import service from "../appwrite/config";
import { addAllTodos } from "../store/todoSlice";

function Header() {
	const authStatus = useSelector((state) => state.authReducer.status);
	const dispatch = useDispatch();

	useEffect(() => {
		getCurrentUser();
	}, []);

	const getCurrentUser = async () => {
		try {
			const currentUser = await authService.getCurrentUser();
			if (currentUser) {
				console.log("Current User :: ", currentUser);
				dispatch(authLogin(currentUser));
				return getAllTodos();
			}
			console.log("Current User :: ", currentUser);
		} catch (error) {
			console.log("Error while getting current user :: ", error);
		}
	};

	const getAllTodos = useCallback(async () => {
		try {
			const result = await service.getTodos();
			if (result) {
				dispatch(addAllTodos(result.documents));
			}
		} catch (error) {
			console.log("Header :: getAllTodos :: ", error);
		}
	}, []);

	return (
		<header className="fixed top-0 z-10 mx-auto flex w-full max-w-full items-center justify-between border-b-[1px] border-b-slate-300 bg-[#121212] p-4 text-white lg:px-10">
			<Link to={"/"}>
				<h1 className="text-xl font-extrabold md:text-3xl">
					All todos
				</h1>
			</Link>
			<div className="flex gap-8">
				<div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
					{!authStatus && (
						<Link to={"/login"}>
							<button className="mr-1 w-full bg-[#ae7aff] px-3  py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
								Login
							</button>
						</Link>
					)}
					{!authStatus && (
						<Link to={"/signup"}>
							<button className="mr-1 w-full bg-[#8d46ff] px-3  py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
								Sign up
							</button>
						</Link>
					)}
					{authStatus && <Logout />}
				</div>
				{/* {!authStatus && (
					<button className="inline-flex w-max items-center justify-center border-[1px] text-nowrap border-white p-3 text-center font-bold text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
							className="mr-2 h-5 w-5"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
								clipRule="evenodd"
							></path>
						</svg>
						Create new
					</button>
				)} */}
			</div>
		</header>
	);
}

export default Header;
