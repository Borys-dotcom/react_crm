import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import "./Customers.css";
import ConfirmationWindow from"../components/ConfirmationWindow";
import { useNavigate } from "react-router";

const Customers = () => {
  const [customerList, setCustomerList] = useState([]);
  let navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState("");

  const getCustomerData = () => {
    axios
      .get(
        `http://${config.db.url}:${config.db.port}/${config.db.collection.customer}/`
      )
      .then((res) => {
        console.log(res)
        setCustomerList(res.data);
      })
      .catch((err) => {
        if (err.response.data.err === "noLogged"){
          const path = "/user/login/";
          navigate(path);
        }
        console.log(err);
      });
  };

  const singleCustomerData = (e) => {
    let path = "/customer/" + e.target.id;
    return navigate(path);
  };

  const addNewCustomer = () => {
    let path = "/add/";
    return navigate(path);
  };

  const editCustomer = (e) => {
    let path = "/edit/" + e.target.id;
    return navigate(path);
  };

  const deleteCustomerConfirmationWindow = (e) => {
    setShowPopUp(!showPopUp);

    let customerToDelete = customerList.filter((customer) => {
      return customer._id === e.target.id;
    });

    setCustomerToDelete(customerToDelete);
  };

  const deleteCustomer = () => {
    let path =
      `http://${config.db.url}:${config.db.port}/${config.db.collection.customer}/delete/` +
      customerToDelete[0]._id;

    axios
      .delete(path)
      .then(() => {
        setShowPopUp(!showPopUp);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        getCustomerData();
      });
    
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div className="container">
      <h1>Lista klientów</h1>
      <button onClick={addNewCustomer}>Add new</button>
      {(customerList.length) ? 
      (<table>
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
                  <button onClick={singleCustomerData} id={customer._id}>
                    Więcej
                  </button>
                  <button onClick={editCustomer} id={customer._id}>
                    Edytuj
                  </button>
                  <button
                    onClick={deleteCustomerConfirmationWindow}
                    id={customer._id}
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>) :
      <h2>Loading..</h2>}
      {showPopUp && (
        <ConfirmationWindow 
          clickedYes={deleteCustomer} 
          clickedNo={() => {setShowPopUp(!showPopUp)}} 
          message={`Czy chcesz usunąć użytkownika ${customerToDelete[0].name}`}
        />
      )}
    </div>
  );
};

export default Customers;
