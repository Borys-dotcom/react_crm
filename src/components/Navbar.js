import { Link } from "react-router-dom";
import "./Navbar.css"
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router"
 
const Navbar = () => {

  const [cookies, setCookie, clearCookie] = useCookies(["user", "token"])
  const navigate = useNavigate();

  const clearCookies = () => {
    clearCookie("user");
    clearCookie("token");
    axios.defaults.headers.common['Authorization'] = "";
  }


    return (
    <div className="container">
      <div className="navbar-container">
        <ul className="navbar-list">
          <Link to="/">Strona główna</Link>
          {cookies["token"] &&<Link to="/add/">Dodaj klienta</Link>}
          {!cookies["token"] && <Link to="/user/create">Załóż konto</Link>}
          {!cookies["token"] && <Link to="/user/login/">Zaloguj</Link>}
          {cookies["token"] && <Link to="/user/login/" onClick={clearCookies}>Wyloguj: {cookies["user"]}</Link>}
        </ul>
      </div>
    </div>
  ); 
};

export default Navbar
