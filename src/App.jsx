import EmptyTodoPage from "./pages/EmptyTodo";
import Header from "./components/Header";
import TodosPage from "./pages/Todos";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Outlet } from "react-router";

function App() {
	return (
		<div className="min-h-screen bg-[#121212]">
			<Header />
			<Outlet />
		</div>
	);
}

export default App;
