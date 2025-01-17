import './App.css';
import Customers from "./views/Customers"
import SingleCustomer from "./views/SingleCustomer";
import HandleCustomer from "./views/HandleCustomer";
import CreateUser from './views/CreateUser';
import Login from './views/Login';
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/customer/:id" element={<SingleCustomer />} />
        <Route path="/edit/:id" element={<HandleCustomer />} />
        <Route path="/add/" element={<HandleCustomer />} />
        <Route path="/user/create/" element={<CreateUser />} />
        <Route path="/user/login/" element={<Login />} />
      </Routes>
      {/* <Customers /> */}
    </div>
  );
}

export default App;
