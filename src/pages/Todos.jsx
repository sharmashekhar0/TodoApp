import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "../appwrite/config";
import { useForm } from "react-hook-form";
import TodoItem from "../components/TodoItem";
import { addTodo } from "../store/todoSlice";

function Todos() {
	const todos = useSelector((state) => state.todoReducer.todos);
	const { register, handleSubmit, reset } = useForm();
	const dispatch = useDispatch();
	const [allTodosActive, setAllTodosActive] = useState(true);
	const [pendingActive, setPendingActive] = useState(false);
	const [completedActive, setCompletedActive] = useState(false);

	const addTodoHandler = async (data) => {
		try {
			const response = await service.createTodo(data);
			if (response) {
				const id = response.$id;
				const task = response.task;
				const createdAt = response.$createdAt;
				dispatch(addTodo({ id, task, createdAt }));
				reset();
			}
		} catch (error) {
			console.log("Error while adding todo :: ", error);
		}
	};

	const showPendingTodosOnly = () => {
		setAllTodosActive(false);
		setCompletedActive(false);
		setPendingActive(true);
	};

	const showCompletedTodosOnly = () => {
		setAllTodosActive(false);
		setCompletedActive(true);
		setPendingActive(false);
	};

	const showAllTodos = () => {
		setAllTodosActive(true);
		setCompletedActive(false);
		setPendingActive(false);
	};

	return (
		<div className="mx-auto flex h-full min-h-screen w-full max-w-full flex-col items-start justify-start px-4 py-28 text-center md:max-w-5xl">
			<div className="flex w-full flex-col gap-5">
				<div className="flex w-full flex-shrink-0 flex-wrap items-center justify-start gap-3 md:gap-6">
					<button
						onClick={showAllTodos}
						className={` px-3 py-2 text-sm font-semibold text-white md:text-base ${
							allTodosActive
								? "border-[1px] border-[#565656] bg-[#232323]"
								: "hover:bg-[#232323]"
						}`}
					>
						All todos
					</button>
					<button
						onClick={showPendingTodosOnly}
						className={`px-3 py-2 text-sm font-semibold text-white hover:bg-[#232323] md:text-base ${
							pendingActive
								? "border-[1px] border-[#565656] bg-[#232323]"
								: "hover:bg-[#232323]"
						}`}
					>
						Pending
					</button>
					<button
						onClick={showCompletedTodosOnly}
						className={`px-3 py-2 text-sm font-semibold text-white hover:bg-[#232323] md:text-base ${
							completedActive
								? "border-[1px] border-[#565656] bg-[#232323]"
								: "hover:bg-[#232323]"
						}`}
					>
						Completed
					</button>
				</div>
				<ul className="divide-y-[1px] divide-white border-[1px] border-white p-0">
					<li>
						<form
							className="flex w-full items-center justify-start"
							onSubmit={handleSubmit(addTodoHandler)}
						>
							<input
								placeholder="Type to add a new todo..."
								className="w-full bg-transparent p-4 outline-none text-white placeholder:text-gray-500 md:p-6"
								{...register("task", { required: true })}
							/>
							<button
								type="submit"
								className="bg-green-500 p-4 text-center text-black hover:bg-green-400 active:bg-green-600 md:p-6"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									className="h-8 w-8"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
						</form>
					</li>
					{todos.map((todo) => {
						return (
							(allTodosActive && (
								<TodoItem key={todo.id} todo={todo} />
							)) ||
							(pendingActive && !todo.isCompleted && (
								<TodoItem key={todo.id} todo={todo} />
							)) ||
							(completedActive && todo.isCompleted && (
								<TodoItem key={todo.id} todo={todo} />
							))
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default Todos;
