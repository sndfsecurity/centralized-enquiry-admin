import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {

    const token =
        localStorage.getItem("token");

    return token
        ? <Dashboard />
        : <Login />;
}

export default App;