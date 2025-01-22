import { Link } from "react-router-dom";
import "./AppNavbar.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const AppNavbar = (props) => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">CRM</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/add/">Dodaj klienta</Nav.Link>
            <Nav.Link href="/user/create/">Nowy użytkownik</Nav.Link>
          <Navbar.Text>
            <a href="/" onClick={props.clearCookies}>Wyloguj: {props.currentUser}</a>
          </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

{
  /* <div className="container">
<div className="navbar-container">
  <ul className="navbar-list">
    <Link to="/">Strona główna</Link>
    <Link to="/add/">Dodaj klienta</Link>
    <Link to="/user/create">Nowy użytkownik</Link>
    <Link to="/user/login/" onClick={props.clearCookies}>Wyloguj: {props.currentUser}</Link>
  </ul>
</div>
</div> */
}
