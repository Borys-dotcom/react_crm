import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";

const SingleCustomer = (props) => {
  let params = useParams();

  const [customerData, setCustomerData] = useState({});

  const getCustomerData = () => {
    axios
      .post(
        `http://${config.db.url}:${config.db.port}/${config.db.collection.customer}/find/${params.id}`
      )
      .then((res) => {
        console.log(res.data.customer)
        setCustomerData(res.data.customer);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(()=>{
    console.log(customerData)
    getCustomerData();
  }, [])

  return (
    <div className="container">
      <h2>{customerData.name}</h2>
      <h3>Adres:</h3>
      {/* <p>{customerData.address.street}</p> */}
      {/* <p>{customerData.address.city} {customerData.address.zipCode}</p> */}
      <p>NIP: {customerData.taxNumber}</p>
    </div>
  );
};

export default SingleCustomer;
