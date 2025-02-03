import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import React from "react";
import ActionList from "./ActionList";
import HandleAction from "./HandleAction";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

const SingleCustomer = () => {
  let params = useParams();

  const [customerData, setCustomerData] = useState(null);
  const navigate = useNavigate();
  const [showAddNewAction, setShowAddNewAction] = useState(false);
  const [getActionData, setGetActionData] = useState(false);
  const [file, setFile] = useState();
  const [fileNote, setFileNote] = useState("");

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

  const handleFileUploadData = async (e) => {
    if (e.target.name === "note") {
      setFileNote(e.target.value);
    }
    if (e.target.name === "file") {
      setFile(e.target.files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("note", fileNote);
    for (let i = 0; i < file.length; i++) {
      formData.append("file", file[i]);
    }
    const multerConfig = { headers: { "Content-Type": "multipart/form-data" } };
    console.log(file);

    axios
      .post(
        `http://${config.db.url}:${config.db.port}/${config.db.collection.files}/upload/abc`,
        formData,
        multerConfig
      )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewActionShow = () => {
    setShowAddNewAction(!showAddNewAction);
  };

  const addNewActionWidowClosed = () => {
    setShowAddNewAction(!showAddNewAction);
    setGetActionData(!getActionData);
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
      {customerData ? (
        <>
          <div
            className="mx-auto container justify-content-center"
            style={{ width: "32rem" }}
          >
            <Button className="btn btn-primary mx-2" onClick={returnToMainPage}>
              Powrót
            </Button>
            <Button className="btn btn-success mx-2" onClick={addNewActionShow}>
              Edytuj
            </Button>
          </div>
          <div
            className="card p-5 mx-auto container h-100 my-2"
            style={{ width: "32rem" }}
          >
            <h2>{customerData.name}</h2>
            <h3>Adres:</h3>
            <p>{customerData.address.street}</p>
            <p>
              {customerData.address.city} {customerData.address.zipCode}
            </p>
            <p>NIP: {customerData.taxNumber}</p>
          </div>
          <div
            className="card mx-auto container justify-content-center"
            style={{ width: "32rem" }}
          >
            <Form style={{ width: "auto" }} onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Dodaj załącznik</Form.Label>
                <Form.Control
                  name="file"
                  type="file"
                  onChange={handleFileUploadData}
                  multiple
                />
              </Form.Group>
              <Form.Group controlId="formNote" className="mb-3">
                <Form.Label>krótka notatka</Form.Label>
                <Form.Control
                  name="note"
                  as="textarea"
                  rows={4}
                  placeholder="Wpisz notatkę"
                  onChange={handleFileUploadData}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-success"
              >
                Wyślij
              </Button>
            </Form>
          </div>
          <ActionList
            customerData={[customerData._id, customerData.name]}
            getActionData={getActionData}
          />
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
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default SingleCustomer;
