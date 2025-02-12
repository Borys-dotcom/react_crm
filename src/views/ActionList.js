import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import HandleAction from "./HandleAction";
import ConfirmationWindow from "../components/ConfirmationWindow";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";

const ActionList = (props) => {
  const [actionList, setActionList] = useState([]);
  const [showAddNewAction, setShowAddNewAction] = useState(false);
  const [idOfActionToEdit, setIdOfActionToEdit] = useState("");
  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);
  const [idOfActionToDelete, setIdOfActionToDelete] = useState("");

  const getActionListFromDB = () => {
    let path = `http://${config.db.url}:${config.db.port}/${config.db.collection.action}/${props.customerData[0]}`;
    axios
      .get(path)
      .then((actions) => {
        setActionList(actions.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAction = (e) => {
    let path = `http://${config.db.url}:${config.db.port}/${config.db.collection.action}/delete/${e.target.id}`;
    axios
      .delete(path)
      .then(() => {
        getActionListFromDB();
        setShowConfirmationWindow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewActionWidowClosed = () => {
    setShowAddNewAction(!showAddNewAction);
    getActionListFromDB();
  };

  const addNewActionShow = (e) => {
    setShowAddNewAction(!showAddNewAction);
    setIdOfActionToEdit(e.target.id);
  };

  useEffect(() => {
    getActionListFromDB();
  }, [props.getActionData]);

  return (
    <div className="container">
      <h3>Lista akcji:</h3>
      <Table striped bordered hover>
        <thead className="table-header">
          <tr>
            <th>Typ</th>
            <th>Opis</th>
            <th>Data</th>
            <th>Autor</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {actionList.map((action, index) => {
            return (
              <tr key={index}>
                <td className="align-middle">{action.type}</td>
                <td className="align-middle">{action.description}</td>
                <td className="align-middle">{action.date.slice(0,10)}</td>
                <td className="align-middle">{action.creator.username}</td>
                <td>
                  <Button
                    variant="warning"
                    className="btn btn-success mx-2"
                    onClick={addNewActionShow}
                    id={action._id}
                  >
                    Edytuj
                  </Button>
                  <Button
                    variant="danger"
                    className="btn btn-success mx-2"
                    onClick={() => {
                      setShowConfirmationWindow(true);
                      setIdOfActionToDelete(action._id);
                    }}
                    id={action._id}
                  >
                    Usuń
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {showConfirmationWindow && (
        <ConfirmationWindow
          idOfTarget={idOfActionToDelete}
          clickedYes={deleteAction}
          clickedNo={() => {
            setShowConfirmationWindow(false);
          }}
          message={"Czy na pewno chcesz usunąć wybraną akcję?"}
        />
      )}
      {showAddNewAction && (
        <HandleAction
          defaultSelection={""}
          idOfActionToEdit={idOfActionToEdit}
          customerData={[props.customerData[0], props.customerData[1]]}
          closeWindow={addNewActionWidowClosed}
          processType={"edit"}
        />
      )}
    </div>
  );
};

export default ActionList;
