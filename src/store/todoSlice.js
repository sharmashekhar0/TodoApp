import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
	todos: [],
};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			console.log(action);
			const todo = {
				id: action.payload.id,
				text: action.payload.task,
				isCompleted: false,
				createdAt: action.payload.createdAt,
			};
			state.todos.push(todo);
		},
		removeTodo: (state, action) => {
			state.todos = state.todos.filter((todo) => {
				return todo.id !== action.payload;
			});
		},
		updateTodo: (state, action) => {
			console.log(action);
			state.todos = state.todos.map((todo) =>
				todo.id === action.payload.id
					? {
							...todo,
							text: action.payload.text,
							isCompleted: action.payload.isCompleted,
							createdAt: action.payload.createdAt,
					  }
					: todo
			);
		},
		addAllTodos: (state, action) => {
			const receivedTodos = action.payload;
			console.log("Received Todos :: ", receivedTodos);
			const updatedTodos = receivedTodos.map((todo) => ({
				id: todo.$id,
				text: todo.task,
				createdAt: todo.$createdAt,
				isCompleted: todo.isCompleted,
			}));
			return {
				...state,
				todos: [...state.todos, ...updatedTodos],
			};
		},
		toggleComplete: (state, action) => {
			state.todos.map((todo) => {
				if (todo.id === action.payload.todo.id) {
					return {
						...todo,
						isCompleted: !action.payload.todo.isCompleted,
					};
				}
				return todo;
			});
		},
	},
});

export const { addTodo, removeTodo, updateTodo, addAllTodos, toggleComplete } =
	todoSlice.actions;

export default todoSlice.reducer;
