import "./App.css";
import Customers from "./views/Customers";
import SingleCustomer from "./views/SingleCustomer";
import HandleCustomer from "./views/HandleCustomer";
import CreateUser from "./views/CreateUser";
import Login from "./views/Login";
import AppNavbar from "./components/AppNavbar";
import { Routes, Route, Navigate } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router";

function App() {
  const [cookies, setCookie, clearCookie] = useCookies(["user", "token"]);
  const currentUser = cookies["user"];
  const navigate = useNavigate();

  axios.defaults.headers.common["Authorization"] = cookies["token"];

  const clearCookies = (e) => {
    e.preventDefault();
    clearCookie("user", {path: "/"});
    clearCookie("token", {path: "/"});
    // clearCookie();
    let path="/";
    navigate(path);
  };

  return (
    <div className="App">
      {!currentUser ? (
        <Routes>
          <Route path="/" element={<Navigate to="/user/login" replace />} />
          <Route path="/user/login/" element={<Login />} />
          <Route path="/user/create/" element={<CreateUser />} />
        </Routes>
      ) : (
        <>
          <AppNavbar currentUser={currentUser} clearCookies={clearCookies} />
          <Routes>
            <Route path="/" element={<Customers />} />
            <Route path="/customer/:id" element={<SingleCustomer />} />
            <Route path="/edit/:id" element={<HandleCustomer />} />
            <Route path="/add/" element={<HandleCustomer />} />
            <Route
              path="/user/create/"
              element={<CreateUser isLoggedIn={currentUser} />}
            />
            <Route path="/user/login/" element={<Login />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
