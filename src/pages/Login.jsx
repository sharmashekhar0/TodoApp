import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import service from "../appwrite/config";
import { addAllTodos } from "../store/todoSlice";
import toast, { Toaster } from "react-hot-toast";

function Login() {
	const [error, setError] = useState("");
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userLogin = async (data) => {
		try {
			setError("");
			const session = await authService.login(data);
			if (session) {
				const userData = await authService.getCurrentUser();
				if (userData) {
					console.log("UserData :: ", userData);
					dispatch(authLogin(userData));
					getAllTodos();
					navigate("/");
				} else {
					toast("Login Failed");
				}
			}
		} catch (err) {
			setError(err.message);
			console.log("Error while logging :: ", error);
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
		<div className="min-h-screen bg-[#121212] flex justify-center items-center">
			<Toaster />
			<div className="mt-20 flex w-full flex-col items-start justify-start p-6 md:w-1/2 lg:px-10">
				<div className="w-full">
					<h1 className="mb-2 text-5xl font-extrabold text-white">
						Login
					</h1>
					<p className="text-xs text-slate-400">
						Before we start, please login your account
					</p>
				</div>
				<form
					onSubmit={handleSubmit(userLogin)}
					className="my-14 flex w-full flex-col items-start justify-start gap-4"
				>
					<div className="flex w-full flex-col items-start justify-start gap-2">
						<label className="text-xs text-slate-200">Email</label>
						<input
							placeholder="Enter an email..."
							autoComplete="false"
							className="w-full border-[1px] border-white bg-black p-4 text-white placeholder:text-gray-500"
							{...register("email", { required: true })}
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
							{...register("password", { required: true })}
						/>
					</div>
					<button className="w-full bg-[#ae7aff] p-3 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
