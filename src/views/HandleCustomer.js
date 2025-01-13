import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./HandleCustomer.css";
import { setNestedKey } from "../helpers/helpers";
import axios from "axios";

const HandleCustomer = () => {
  let params = useParams();

  const [customerData, setCustomerData] = useState({
    name: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
    taxNumber: "",
  });

  const initializationOfCustomerDataIfEdit = () => {
    if (params.id) {
      let path = "http://localhost:3005/customer/find/" + params.id;
      axios
        .post(path)
        .then((customer) => {
          setCustomerData(customer.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [errorMessages, setErrorMessages] = useState([]);
  const [inputState, setInputState] = useState({
    name: "inputNormal",
    address: {
      street: "inputNormal",
      city: "inputNormal",
      zipCode: "inputNormal",
    },
    taxNumber: "inputNormal",
  });
  const navigate = useNavigate();

  const acquireCustomerData = (e) => {
    const value = e.target.value;
    const propPath = e.target.id.split(".");
    const tempCustomerData = { ...customerData };

    setNestedKey(tempCustomerData, propPath, value);

    setCustomerData(tempCustomerData);
  };

  const submitData = (e) => {
    e.preventDefault();
    if (!validateData(customerData)) return;

    if (!params.id) {
      const path = "http://localhost:3005/customer/add/";
      axios
        .post(path, customerData)
        .then(() => {
          let path = "/";
          return navigate(path);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const path = "http://localhost:3005/customer/update/" + params.id;
      axios
        .post(path, customerData)
        .then(() => {
          let path = "/";
          return navigate(path);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const validateData = () => {
    let errorMessagesArray = [];
    let tempInputClassObject = {
      name: "inputNormal",
      address: {
        street: "inputNormal",
        city: "inputNormal",
        zipCode: "inputNormal",
      },
      taxNumber: "inputNormal",
    };

    setErrorMessages([]);

    //name errors handling
    if (customerData.name === "") {
      errorMessagesArray.push("Podaj nazwę firmy.");
      tempInputClassObject.name = "inputError";
    } else if (customerData.name.length < 5) {
      errorMessagesArray.push("Pole nazwa musi zawierać więcej niż 4 znaki");
      tempInputClassObject.name = "inputError";
    }
    //street errors handling
    if (customerData.address.street === "") {
      errorMessagesArray.push("Podaj nazwę ulicy.");
      tempInputClassObject.address.street = "inputError";
    } else if (customerData.address.street.length < 5) {
      errorMessagesArray.push("Pole ulica musi zawierać więcej niż 4 znaki");
      tempInputClassObject.address.street = "inputError";
    }
    //city errors handling
    if (customerData.address.city === "") {
      errorMessagesArray.push("Podaj nazwę miasta.");
      tempInputClassObject.address.city = "inputError";
    } else if (customerData.address.city.length < 5) {
      errorMessagesArray.push("Pole miasto musi zawierać więcej niż 4 znaki");
      tempInputClassObject.address.city = "inputError";
    }

    //zpi-code errors handling
    let regEx = "^[0-9]{2}-[0-9]{3}$";

    if (customerData.address.zipCode === "") {
      errorMessagesArray.push("Podaj kod pocztowy.");
      tempInputClassObject.address.zipCode = "inputError";
    } else if (!customerData.address.zipCode.match(regEx)) {
      errorMessagesArray.push(
        "Kod pocztowy powinien być podany w formacie XX-XXX."
      );
      tempInputClassObject.address.zipCode = "inputError";
    }

    //tax-number errors handling
    regEx =
      "^(([0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2})|([0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{3}))$";

    if (customerData.taxNumber === "") {
      errorMessagesArray.push("Podaj NIP.");
      tempInputClassObject.taxNumber = "inputError";
    } else if (!customerData.taxNumber.match(regEx)) {
      errorMessagesArray.push("Podaj poprawny NIP.");
      tempInputClassObject.taxNumber = "inputError";
    }

    setErrorMessages(errorMessagesArray);
    setInputState(tempInputClassObject);

    if (errorMessagesArray.length) {
      return false;
    } else {
      return true;
    }
  };

  const returnToMainPage = () => {
    let path = "/";
    return navigate(path);
  };

  useEffect(initializationOfCustomerDataIfEdit, []);

  return (
    <div className="container">
      {params.id ? <h2>Modyfikuj dane</h2> : <h2>Nowy klient</h2>}
      <div className="form-container">
        <form onSubmit={submitData} onChange={acquireCustomerData}>
          <label htmlFor="name">Nazwa: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={customerData.name}
            onChange={acquireCustomerData}
            className={`${inputState.name}`}
          />
          <label htmlFor="street">Ulica: </label>
          <input
            type="text"
            name="street"
            id="address.street"
            value={customerData.address.street}
            onChange={acquireCustomerData}
            className={`${inputState.address.street}`}
          />
          <label htmlFor="city">Miasto: </label>
          <input
            type="text"
            name="city"
            id="address.city"
            value={customerData.address.city}
            onChange={acquireCustomerData}
            className={`${inputState.address.city}`}
          />
          <label htmlFor="zipCode">Kod pocztowy: </label>
          <input
            type="text"
            name="zipCode"
            id="address.zipCode"
            value={customerData.address.zipCode}
            onChange={acquireCustomerData}
            className={`${inputState.address.zipCode}`}
          />
          <label htmlFor="taxNumber">NIP: </label>
          <input
            type="text"
            name="taxNumber"
            id="taxNumber"
            value={customerData.taxNumber}
            onChange={acquireCustomerData}
            className={`${inputState.taxNumber}`}
          />
          <br />
          <button type="submit">Zatwierdź</button>
        </form>
        <div className="error-messages">
          <ul>
            {errorMessages.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
        </div>
      </div>
      <button onClick={returnToMainPage}>Powrót</button>
    </div>
  );
};

export default HandleCustomer;
