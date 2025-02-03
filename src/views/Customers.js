import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import "./Customers.css";
import ConfirmationWindow from "../components/ConfirmationWindow";
import { useNavigate } from "react-router";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { Pagination, PageItem } from "react-bootstrap";

const Customers = () => {
  const [customerList, setCustomerList] = useState([]);
  let navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState("");
  const [paginationData, setPaginationData] = useState({
    elementsPerPage: 10,
    activePage: 1,
    totalNumberOfCustomers: 0,
    numberOfPages: 0,
  });
  const [paginationButtons, setPaginationButtons] = useState([]);

  const getCustomerData = () => {
    axios
      .get(
        `http://${config.db.url}:${config.db.port}/${config.db.collection.customer}/${paginationData.activePage}/${paginationData.elementsPerPage}`
      )
      .then((res) => {
        setCustomerList(res.data);
      })
      .catch((err) => {
        if (err.response.data.err === "noLogged") {
          const path = "/user/login/";
          navigate(path);
        }
        console.log(err);
      });
  };

  const getNumberOfCustomers = () => {
    axios
      .get(
        `http://${config.db.url}:${config.db.port}/${config.db.collection.customer}/count`
      )
      .then((numberOfCustomers) => {
        setPaginationData((prevPaginationData) => {
          return {
            ...prevPaginationData,
            totalNumberOfCustomers: numberOfCustomers.data,
          };
        });
        setDataForPaginationButtons();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectChange = (e) => {
    setPaginationData((prevPaginationData) => {
      return {
        ...prevPaginationData,
        [e.target.id]: e.target.value,
        activePage: 1,
      };
    });
    setDataForPaginationButtons();
  };

  const setDataForPaginationButtons = () => {
    let tempNumberOfPages = Math.ceil(
      paginationData.totalNumberOfCustomers / paginationData.elementsPerPage
    );

    setPaginationData((prevPaginationData) => {
      return { ...prevPaginationData, numberOfPages: tempNumberOfPages };
    });

    let tempArrayOfPaginationButtons = [];

    for (
      let buttonNumber = 1;
      buttonNumber <= tempNumberOfPages;
      buttonNumber++
    ) {
      tempArrayOfPaginationButtons.push(
        <Pagination.Item
          key={buttonNumber}
          active={buttonNumber === paginationData.activePage}
          onClick={() => manageChangeOfPage(buttonNumber)}
        >
          {buttonNumber}
        </Pagination.Item>
      );
    }
    setPaginationButtons(tempArrayOfPaginationButtons);
  };

  const manageChangeOfPage = (pageNumber) => {
    setPaginationData((prevPaginationData) => {
      return { ...prevPaginationData, activePage: pageNumber };
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

  const uploadFile = () => {};

  useEffect(() => {
    getCustomerData();
    getNumberOfCustomers();
    setDataForPaginationButtons();
  }, [
    paginationData.elementsPerPage,
    paginationData.activePage,
    paginationData.totalNumberOfCustomers,
  ]);

  return (
    <div className="container">
      <h1>Lista klientów</h1>
      <div className="container-flex">
        <Button className="btn btn-success mx-2" onClick={addNewCustomer}>
          Dodaj klienta
        </Button>
        <Form className="inline-form">
          <Form.Label htmlFor="elementsPerPage">
            Ilość Wyników na stronie
          </Form.Label>
          <Form.Select
            aria-label="Default select example"
            id="elementsPerPage"
            onChange={handleSelectChange}
            defaultValue={10}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Form.Select>
        </Form>
      </div>
      {customerList.length ? (
        <Table striped bordered hover className="mt-3">
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
                  <td className="align-middle">{customer.name}</td>
                  <td className="align-middle">{customer.address.street}</td>
                  <td className="align-middle">{customer.address.city}</td>
                  <td className="align-middle">{customer.address.zipCode}</td>
                  <td className="align-middle">{customer.taxNumber}</td>
                  <td className="d-flex justify-content-start">
                    <Button
                      className="btn btn-primary mx-2"
                      onClick={singleCustomerData}
                      id={customer._id}
                    >
                      Więcej
                    </Button>
                    <Button
                      className="btn btn-success mx-2"
                      onClick={editCustomer}
                      id={customer._id}
                    >
                      Edytuj
                    </Button>
                    <Button
                      className="btn btn-danger mx-2"
                      onClick={deleteCustomerConfirmationWindow}
                      id={customer._id}
                    >
                      Usuń
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h2>Loading..</h2>
      )}
      <div className="d-flex justify-content-center">
        <Pagination>{paginationButtons}</Pagination>
      </div>
      {showPopUp && (
        <ConfirmationWindow
          clickedYes={deleteCustomer}
          clickedNo={() => {
            setShowPopUp(!showPopUp);
          }}
          message={`Czy chcesz usunąć użytkownika ${customerToDelete[0].name}`}
        />
      )}
    </div>
  );
};

export default Customers;
