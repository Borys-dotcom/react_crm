import React, { useEffect, useState } from "react";
import "./FilesList.css";
import { Table, Button } from "react-bootstrap";
import config from "../config";
import axios from "axios";

const FilesList = (props) => {
  const [filesList, setFilesList] = useState([]);

  const getFilesData = () => {
    const path = `http://${config.db.url}:${config.db.port}/files/find/${props.customerId}`;
    axios
      .get(path)
      .then((res) => {
        setFilesList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFilesData();
  }, [props.getFilesData]);

  return (
    <div>
      <h3>Lista plików:</h3>
      <Table striped bordered hover>
        <thead className="table-header">
          <tr>
            <th>Nazwa</th>
            <th>Opis</th>
            <th>Data</th>
            <th>Autor</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {filesList &&
            filesList.map((file, index) => {
              return (
                <tr key={index}>
                  <td className="align-middle">{file.name}</td>
                  <td className="align-middle">{file.note}</td>
                  <td className="align-middle">{file.date.slice(0, 10)}</td>
                  <td className="align-middle">{file.creator.username}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="btn btn-success mx-2"
                      // onClick={addNewActionShow}
                      // id={action._id}
                    >
                      Edytuj
                    </Button>
                    <Button
                      variant="danger"
                      className="btn btn-success mx-2"
                      // onClick={() => {
                      //   setShowConfirmationWindow(true);
                      //   setIdOfActionToDelete(action._id);
                      // }}
                      // id={action._id}
                    >
                      Usuń
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default FilesList;
