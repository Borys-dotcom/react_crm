import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import React from "react";
import ActionList from "./ActionList";
import NewAction from "./NewAction";

const SingleCustomer = () => {
  let params = useParams();

  const [customerData, setCustomerData] = useState([]);
  const navigate = useNavigate();
  const [showAddNewAction, setShowAddNewAction] = useState(false);
 
  const getCustomerData = () => {
    axios
      .post(
        `http://${config.db.url}:${config.db.port}/${config.db.collection.customer}/find/${params.id}`
      )
      .then((res) => {
        setCustomerData([
          <h2>{res.data.name}</h2>,
          <h3>Adres:</h3>,
          <p>{res.data.address.street}</p>,
          <p>
            {res.data.address.city} {res.data.address.zipCode}
          </p>,
          <p>NIP: {res.data.taxNumber}</p>,
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addNewActionShow = () => {
    setShowAddNewAction(!showAddNewAction);
  };

  const returnToMainPage = () => {
    let path = "/";
    return navigate(path);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div className="container">
      {customerData.map((data, index) => {
        return <div key={index}>{data}</div>;
      })}
      <button onClick={returnToMainPage}>Powrót</button>
      <button onClick={addNewActionShow}>Dodaj nową akcję</button>
      <ActionList customerId={params.id}/>
      {showAddNewAction && <NewAction addNewActionShow={addNewActionShow} defaultSelection={params.id}/>}
    </div>
  );
};

export default SingleCustomer;
