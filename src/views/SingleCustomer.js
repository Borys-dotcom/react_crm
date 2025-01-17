import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import React from "react";
import ActionList from "./ActionList";
import HandleAction from "./HandleAction";

const SingleCustomer = () => {
  let params = useParams();

  const [customerData, setCustomerData] = useState(null);
  const navigate = useNavigate();
  const [showAddNewAction, setShowAddNewAction] = useState(false);
  const [getActionData, setGetActionData] = useState(false);

  const getCustomerData = () => {
    axios
      .get(
        `http://${config.db.url}:${config.db.port}/${config.db.collection.customer}/find/${params.id}`
      )
      .then((customer) => {
        setCustomerData(customer.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addNewActionShow = () => {
    setShowAddNewAction(!showAddNewAction);
  };

  const addNewActionWidowClosed = () => {
    setShowAddNewAction(!showAddNewAction);
    setGetActionData(!getActionData);
  }

  const returnToMainPage = () => {
    let path = "/";
    return navigate(path);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div className="container">
      {customerData ? (
        <>
          <h2>{customerData.name}</h2>
          <h3>Adres:</h3>
          <p>{customerData.address.street}</p>
          <p>
            {customerData.address.city} {customerData.address.zipCode}
          </p>
          <p>NIP: {customerData.taxNumber}</p>
          <button onClick={returnToMainPage}>Powrót</button>
          <button onClick={addNewActionShow}>Dodaj nową akcję</button>
          <ActionList customerData={[customerData._id, customerData.name]} getActionData={getActionData}/>
          {showAddNewAction && (
            <HandleAction
              addNewActionShow={addNewActionShow}
              defaultSelection={params.id}
              customerData={[customerData._id, customerData.name]}
              closeWindow={addNewActionWidowClosed}
              processType={"create"}
            />
          )}
        </>
      ) : <h3>Loading...</h3>}
    </div>
  );
};

export default SingleCustomer;
