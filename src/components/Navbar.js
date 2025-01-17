import { Link } from "react-router-dom";
import "./Navbar.css"


const Navbar = () => {
  
    return (
    <div className="container">
      <div className="navbar-container">
        <ul className="navbar-list">
          <Link to="/">Strona główna</Link>
          <Link to="/add/">Dodaj klienta</Link>
          <Link to="/user/create">Załóż konto</Link>
          <Link to="/user/login">Zaloguj</Link>
        </ul>
      </div>
    </div>
  ); 
};

export default Navbar
