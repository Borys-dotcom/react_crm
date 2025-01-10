import { useState } from "react";
import { useNavigate } from "react-router";
import "./AddCustomer.css";
import { setNestedKey } from "../helpers/helpers";

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
    taxNumber: "",
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const acquireCustomerData = (e) => {
    const value = e.target.value.trim();
    const propPath = e.target.id.split(".");
    const tempCustomerData = { ...customerData };

    setNestedKey(tempCustomerData, propPath, value);

    setCustomerData(tempCustomerData);
  };

  const submitData = (e) => {
    e.preventDefault();
    validateData(customerData);
  };

  const validateData = () => {
    let errorMessagesArray = [];

    setErrorMessages([]);

    if (customerData.name === "") {
      errorMessagesArray.push("Podaj nazwę firmy.");
    }
    if (customerData.address.street === "") {
      errorMessagesArray.push("Podaj nazwę ulicy.");
    }
    if (customerData.address.city === "") {
      errorMessagesArray.push("Podaj nazwę miasta.");
    }
    if (customerData.address.zipCode === "") {
      errorMessagesArray.push("Podaj kod pocztowy.");
    }
    if (customerData.taxNumber === "") {
      errorMessagesArray.push("Podaj NIP.");
    }

    setErrorMessages(errorMessagesArray);
  };

  const returnToMainPage = () => {
    let path = "/";
    return navigate(path);
  };

  return (
    <div className="container">
      <h2>Add customer</h2>
      <form onSubmit={submitData} onChange={acquireCustomerData}>
        <label htmlFor="name">Nazwa: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={customerData.name}
          onChange={acquireCustomerData}
        />
        <label htmlFor="street">Ulica: </label>
        <input
          type="text"
          name="street"
          id="address.street"
          value={customerData.address.street}
          onChange={acquireCustomerData}
        />
        <label htmlFor="city">Miasto: </label>
        <input
          type="text"
          name="city"
          id="address.city"
          value={customerData.address.city}
          onChange={acquireCustomerData}
        />
        <label htmlFor="zipCode">Kod pocztowy: </label>
        <input
          type="text"
          name="zipCode"
          id="address.zipCode"
          value={customerData.address.zipCode}
          onChange={acquireCustomerData}
        />
        <label htmlFor="taxNumber">NIP: </label>
        <input
          type="text"
          name="taxNumber"
          id="taxNumber"
          value={customerData.taxNumber}
          onChange={acquireCustomerData}
        />
        <br />
        <button type="submit">Dodaj klienta</button>
      </form>
      <div className="error-messages">
        <ul>
          {errorMessages.map((message, index) => {
            return <li>{message}</li>;
          })}
        </ul>
      </div>
      <button onClick={returnToMainPage}>Powrót</button>
    </div>
  );
};

export default AddCustomer;
