import React, { useState } from "react";
import service from "../appwrite/config";
import { useDispatch } from "react-redux";
import { removeTodo, updateTodo, toggleComplete } from "../store/todoSlice";

function TodoItem({ todo }) {
	const dispatch = useDispatch();
	const [text, setText] = useState(todo.text);
	const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
	const [isTodoEditable, setIsTodoEditable] = useState(false);

	const removeTodohandler = () => {
		deleteFromServer();
	};

	const deleteFromServer = async () => {
		try {
			const isDeleted = await service.deleteTodo(todo.id);
			if (isDeleted) {
				console.log("Todo deleted", isDeleted);
				dispatch(removeTodo(todo.id));
			}
		} catch (error) {
			console.log("Error while deleting todo from server", error);
		}
	};

	const updateTodoHandler = () => {
		if (isTodoEditable) {
			updateOnServer(todo.id, text, isCompleted);
		}
		setIsTodoEditable(!isTodoEditable);
	};

	const updateOnServer = async (id, text, isCompleted) => {
		try {
			const response = await service.updateTodo(id, text, isCompleted);
			if (response) {
				const createdAt = todo.createdAt;
				dispatch(updateTodo({ id, text, createdAt, isCompleted }));
			}
		} catch (error) {
			console.log("Error while updating todo on server", error);
		}
	};

	const toggleCompleteItem = () => {
		dispatch(toggleComplete({ todo }));
		setIsCompleted(!isCompleted);
		updateOnServer(todo.id, todo.text, !isCompleted);
	};

	const changeInTextHandler = (e) => {
		setText(e.currentTarget.value);
	};

	const dateString = todo?.createdAt;
	const date = new Date(dateString).toDateString();

	return (
		<li
			key={todo.id}
			className="flex w-full items-center justify-start p-4 md:p-6"
		>
			<input
				type="checkbox"
				id={`checkbox-${todo.id}`}
				className="absolute h-5 w-5 cursor-pointer opacity-0 md:h-6 md:w-6 [&:checked+div+p]:text-[#898989] [&:checked+div+p]:line-through [&:checked+div]:bg-green-500 [&:checked+div_svg]:block"
				name={`checkbox-${todo.id}`}
				checked={isCompleted}
				onChange={toggleCompleteItem}
			/>
			<div className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center border-[1px] border-white bg-transparent focus-within:border-white md:mr-4 md:h-6 md:w-6">
				<svg
					className="pointer-events-none hidden h-3 w-3 fill-current text-white"
					version="1.1"
					viewBox="0 0 17 12"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g fill="none" fillRule="evenodd">
						<g
							transform="translate(-9 -11)"
							fill="#000000"
							fillRule="nonzero"
						>
							<path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"></path>
						</g>
					</g>
				</svg>
			</div>
			<p
				id={`todo-${todo.id}`}
				className="mr-3 truncate text-left text-sm font-semibold text-white md:text-base"
			>
				<input
					className={`bg-inherit w-full outline-none p-2 ${
						isCompleted ? "line-through" : ""
					} ${isTodoEditable ? "border" : ""}`}
					type="text"
					value={text}
					onChange={changeInTextHandler}
					readOnly={!isTodoEditable}
				/>
			</p>
			<div className="ml-auto flex flex-shrink-0 border-[1px] border-white px-2 py-1 text-xs text-white md:text-sm">
				{date}
			</div>
			<button
				onClick={removeTodohandler}
				className="ml-2 flex flex-shrink-0 border-[1px] border-red-500 bg-red-500 p-1"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					aria-hidden="true"
					className="h-5 w-5 text-white"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					></path>
				</svg>
			</button>
			<button
				onClick={updateTodoHandler}
				className="ml-2 flex flex-shrink-0 border-[1px] border-blue-500 bg-blue-500 p-1"
			>
				<p className="h-5 w-5 text-white flex justify-center items-center">
					{isTodoEditable ? "📁" : "✏️"}
				</p>
			</button>
		</li>
	);
}

export default TodoItem;
