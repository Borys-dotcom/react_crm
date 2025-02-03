// import "./Login.css";
import { useState } from "react";
import config from "../config";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputClassObject, setInputClassObject] = useState({});
  const [cookies, setCookie] = useCookies(["token", "user"]);

  const navigate = useNavigate();

  const handleUserData = (e) => {
    setUserData((prevUserData) => {
      return { ...prevUserData, [e.target.name]: e.target.value };
    });
  };

  const submitUserData = (e) => {
    e.preventDefault();
    if (validateUserData()) {
      let path = `http://${config.db.url}:${config.db.port}/${config.db.collection.user}/login/`;
      axios
        .post(path, userData)
        .then((res) => {
          setCookie("token", res.data.token, {path: "/"});
          setCookie("user", userData.username, {path: "/"});
          axios.defaults.headers.common["Authorization"] = res.data.token;
          navigate("/");
        })
        .catch((err) => {
          let tempErrorMessages = [];
          console.log(err);
          if (err.response?.data.err === "noUser") {
            tempErrorMessages.push("Użytkownik o podanej nazwie nie istnieje.");
          } else if (err.response?.data.err === "wrongPassword") {
            tempErrorMessages.push("Wpisano niepoprawne hasło");
          }
          setErrorMessages(tempErrorMessages);
        });
    }
  };

  const validateUserData = () => {
    const tempErrorArray = [];
    const tempInputClassObject = {
      username: "normalInput",
      password: "normalInput",
    };

    if (userData.username === "") {
      tempErrorArray.push("Podaj nazwę użytkownika.");
      tempInputClassObject.username = "inputError";
    }
    if (userData.password === "") {
      tempErrorArray.push("Podaj hasło.");
      tempInputClassObject.password = "inputError";
    }

    setErrorMessages(tempErrorArray);
    setInputClassObject(tempInputClassObject);

    if (tempErrorArray.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="card p-5 mx-auto container h-100 mt-5" style={{width: "32rem"}}>
      <h2>Podaj dane do logowania:</h2>
      <div className="create-user-organising-div row align-items-center">
        <Form onSubmit={submitUserData}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Nazwa użytkownika: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleUserData}
              value={userData.username || ""}
              placeholder="Nazwa użytkownika"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Hasło: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleUserData}
              value={userData.password || ""}
              placeholder="hasło"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn btn-success">
            Zaloguj
          </Button>
        </Form>
        <div className="create-user-alarm-container">
          <ul>
            {errorMessages.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
        </div>
      </div>
      <a href="/user/create/">Stwórz nowego użytkownika</a>
    </div>
  );
};

export default Login;
