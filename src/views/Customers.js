import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import "./Customers.css"
import { useNavigate } from "react-router";
import { redirect } from "react-router"

const Customers = () => {
  const [customerList, setCustomerList] = useState([]);
  let navigate = useNavigate();

  const getCustomerData = () => {
    axios
      .get(
        `http://${config.db.url}:${config.db.port}/${config.db.collection.customer}/`
      )
      .then((res) => {
        setCustomerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const singleCustomerData = (e) => {
    let path = "/customer/" + e.target.id;
    return navigate(path);
  }

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div className="container">
      <h1>Customers List</h1>
      <table>
        <thead className="table-header">
          <tr>
            <th>Nazwa</th>
            <th>Ulica</th>
            <th>Miasto</th>
            <th>Kod pocztowy</th>
            <th>NIP</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {customerList.map((customer, index) => {
            return (
            <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.address.street}</td>
                <td>{customer.address.city}</td>
                <td>{customer.address.zipCode}</td>
                <td>{customer.taxNumber}</td>
                <td>
                    <button onClick={singleCustomerData} id={customer._id}>Więcej</button>
                </td>
            </tr>
            )
        })}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
