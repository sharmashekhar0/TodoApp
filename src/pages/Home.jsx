import React from "react";
import Header from "../components/Header";
import EmptyTodo from "./EmptyTodo";
import Todos from "./Todos";
import { useSelector } from "react-redux";

function Home() {
	const authStatus = useSelector((state) => state.authReducer.status);
	return (
		<div className="min-h-screen bg-[#121212]">
			{!authStatus && <EmptyTodo />}
			{authStatus && <Todos />}
		</div>
	);
}

export default Home;
