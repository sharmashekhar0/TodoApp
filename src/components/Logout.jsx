import React from "react";
import { useDispatch } from "react-redux";
import authService from "../appwrite/authService";
import { logout as authLogout } from "../store/authSlice";

function Logout() {
	const dispatch = useDispatch();

	const userLogout = async () => {
		try {
			const response = await authService.logout();
			if (response) {
				dispatch(authLogout());
			}
		} catch (error) {
			console.log("Error while logging out :: ", error);
		}
	};

	return (
		<button
			onClick={userLogout}
			className="mr-1 w-full bg-[#8d46ff] px-3  py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
		>
			Logout
		</button>
	);
}

export default Logout;
