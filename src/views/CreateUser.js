import { useState } from "react";
import "./CreateUser.css";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateUser = (props) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeated: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [inputClassObject, setInputClassObject] = useState({});
  const navigate = useNavigate();

  const handleUserData = (e) => {
    setUserData((prevUserData) => {
      return { ...prevUserData, [e.target.name]: e.target.value };
    });
  };

  const submitUserData = (e) => {
    e.preventDefault();
    if (validateUserData()) {
      let userDataToSubmit = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      };

      let path = `http://${config.db.url}:${config.db.port}/${config.db.collection.user}/add/`;
      axios
        .post(path, userDataToSubmit)
        .then((res) => {
          if (props.isLoggedIn) {
            path = "/";
          } else {
            path = "/user/login/";
          }
          navigate(path);
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
      email: "normalInput",
      password: "normalInput",
      passwordRepeated: "normalInput",
    };

    if (userData.username === "") {
      tempErrorArray.push("Podaj nazwę użytkownika.");
      tempInputClassObject.username = "inputError";
    }
    if (userData.email === "") {
      tempErrorArray.push("Podaj email.");
      tempInputClassObject.email = "inputError";
    }
    if (userData.password === "") {
      tempErrorArray.push("Podaj hasło.");
      tempInputClassObject.password = "inputError";
    }
    if (userData.password === "") {
      tempErrorArray.push("Powtórz hasło.");
      tempInputClassObject.passwordRepeated = "inputError";
    }
    if (userData.password !== userData.passwordRepeated) {
      tempErrorArray.push("Powtórzone hasło się nie zgadza.");
      tempInputClassObject.passwordRepeated = "inputError";
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
      <h2>Stwórz użytkownika</h2>
      <div className="create-user-organising-div row align-items-center">
        <Form onSubmit={submitUserData}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Nazwa użytkownika: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              onChange={handleUserData}
              value={userData.username || ""}
              placeholder="Nazwa użytkownika"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Adres email: </Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              onChange={handleUserData}
              value={userData.email || ""}
              placeholder="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Hasło: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              onChange={handleUserData}
              value={userData.password || ""}
              placeholder="hasło"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordRepeated">
            <Form.Label>Powtórz hasło: </Form.Label>
            <Form.Control
              type="password"
              name="passwordRepeated"
              id="passwordRepeated"
              onChange={handleUserData}
              value={userData.passwordRepeated || ""}
              placeholder="hasło"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn btn-success">
            Wyślij
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
      {!props.isLoggedIn && <a href="/">Zaloguj</a>}
    </div>
  );
};

export default CreateUser;

// return (
//   <div className="container">
//     <h2>Stwórz użytkownika</h2>
//     {!props.isLoggedIn && <a href="/user/login/">Zaloguj</a>}
//     <div className="create-user-organising-div">
//       <form onSubmit={submitUserData}>
//         <label htmlFor="username">Nazwa użytkownika: </label>
//         <input
//           type="text"
//           name="username"
//           id="username"
//           onChange={handleUserData}
//           value={userData.username || ""}
//           className={inputClassObject.username}
//         />
//         <label htmlFor="email">Adres email: </label>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           onChange={handleUserData}
//           value={userData.email || ""}
//           className={inputClassObject.email}
//         />
//         <label htmlFor="password">Hasło: </label>
//         <input
//           type="password"
//           name="password"
//           id="password"
//           onChange={handleUserData}
//           value={userData.password || ""}
//           className={inputClassObject.password}
//         />
//         <label htmlFor="passwordRepeated">Powtórz hasło: </label>
//         <input
//           type="password"
//           name="passwordRepeated"
//           id="passwordRepeated"
//           onChange={handleUserData}
//           value={userData.passwordRepeated || ""}
//           className={inputClassObject.passwordRepeated}
//         />
//         <button>Wyślij</button>
//       </form>
//       <div className="create-user-alarm-container">
//         <ul>
//           {errorMessages.map((message, index) => {
//             return <li key={index}>{message}</li>;
//           })}
//         </ul>
//       </div>
//     </div>
//   </div>
// );
