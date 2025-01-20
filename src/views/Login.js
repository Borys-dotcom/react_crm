import "./Login.css";
import { useState } from "react";
import config from "../config";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

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
          setCookie("token", res.data.token);
          setCookie("user", userData.username);
          axios.defaults.headers.common['Authorization'] = res.data.token;
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
    <div className="container">
      <h2>Podaj dane do logowania:</h2>
      <div className="create-user-organising-div">
        <form onSubmit={submitUserData}>
          <label htmlFor="username">Nazwa użytkownika: </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleUserData}
            value={userData.username || ""}
            className={inputClassObject.username}
          />
          <label htmlFor="password">Hasło: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleUserData}
            value={userData.password || ""}
            className={inputClassObject.password}
          />
          <button>Wyślij</button>
        </form>
        <div className="create-user-alarm-container">
          <ul>
            {errorMessages.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
