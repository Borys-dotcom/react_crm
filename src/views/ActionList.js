import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const ActionList = (props) => {
  const [actionList, setActionList] = useState([]);

  const getActionListFromDB = () => {
    let path = `http://${config.db.url}:${config.db.port}/${config.db.collection.action}/${props.customerData[0]}`;
    console.log("pobieram listę akcji");
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
    console.log("kasuję");
    axios
      .delete(path)
      .then(() => {
        getActionListFromDB();
      })
      .catch((err) => {
        console.log(err);
      });

  };

  console.log(actionList);

  useEffect(() => {
    getActionListFromDB();
  }, [props.getActionData]);

  return (
    <div className="container">
      <h3>Lista akcji:</h3>
      <table>
        <thead className="table-header">
          <tr>
            <th>Typ</th>
            <th>Opis</th>
            <th>Data</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {actionList.map((action, index) => {
            return (
              <tr key={index}>
                <td>{action.type}</td>
                <td>{action.description}</td>
                <td>{action.date}</td>
                <td>
                  <button>Edytuj</button>
                  <button onClick={deleteAction} id={action._id}>
                    Usuń
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ActionList;
