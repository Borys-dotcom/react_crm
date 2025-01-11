import "./Navbar.css"

const Navbar = () => {
  
    return (
    <div className="container">
      <div className="navbar-container">
        <ul className="navbar-list">
          <li><a href="/">Strona główna</a></li>
          <li><a href="/add/">Dodaj klienta</a></li>
        </ul>
      </div>
    </div>
  ); 
};

export default Navbar
