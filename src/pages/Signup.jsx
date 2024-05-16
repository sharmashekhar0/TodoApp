import React from "react";
import authService from "../appwrite/authService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";

function Signup() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userSignup = async (data) => {
		try {
			const session = await authService.createAccount(data);
			if (session) {
				navigate("/");
				dispatch(authLogin(session));
			}
		} catch (error) {
			console.log("Error while signing :: ", error);
		}
	};

	return (
		<div className="min-h-screen bg-[#121212] flex justify-center items-center">
			<div className="mt-20 flex w-full flex-col items-start justify-start p-6 md:w-1/2 lg:px-10">
				<div className="w-full">
					<h1 className="mb-2 text-5xl font-extrabold text-white">
						Register
					</h1>
					<p className="text-xs text-slate-400">
						Before we start, please create your account
					</p>
				</div>
				<form
					onSubmit={handleSubmit(userSignup)}
					className="my-14 flex w-full flex-col items-start justify-start gap-4"
				>
					<div className="flex w-full flex-col items-start justify-start gap-2">
						<label className="text-xs text-slate-200">
							Full name
						</label>
						<input
							placeholder="Enter a full name..."
							autoComplete="false"
							className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
							{...register("name")}
						/>
					</div>
					<div className="flex w-full flex-col items-start justify-start gap-2">
						<label className="text-xs text-slate-200">Email</label>
						<input
							placeholder="Enter an email..."
							autoComplete="false"
							className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
							{...register("email")}
						/>
					</div>
					<div className="flex w-full flex-col items-start justify-start gap-2">
						<label className="text-xs text-slate-200">
							Password
						</label>
						<input
							placeholder="Enter a password..."
							autoComplete="false"
							type="password"
							className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
							{...register("password")}
						/>
					</div>
					<button className="w-full bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
						Create Account
					</button>
				</form>
			</div>
		</div>
	);
}

export default Signup;
