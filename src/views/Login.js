import "./Login.css";
import { useState } from "react";
import config from "../config";
import axios from "axios";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputClassObject, setInputClassObject] = useState({});

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
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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
