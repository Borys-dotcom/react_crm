import CustomSelect from "../components/CustomSelect";
import "./NewAction.css";
import config from "../config";
import axios from "axios";
import { useEffect, useState } from "react";

const NewAction = (props) => {
  // console.log(props.idOfActionToEdit)
  const [newActionData, setNewActionData] = useState({
    name: props.customerData[1],
    type: "",
    description: "",
    date: "",
    customerRef: props.customerData[0],
  });
  const [headerMessage, setHeaderMessage] = useState("");

  const updateNewActionData = (e) => {
    setNewActionData((prevNewActionData) => {
      return { ...prevNewActionData, [e.target.name]: e.target.value };
    });
  };

  const initializeFormData = () => {
    if (props.processType === "edit") {
      setHeaderMessage("Edytuj akcję klienta:");

      axios
        .get(
          `http://${config.db.url}:${config.db.port}/${config.db.collection.action}/find/${props.idOfActionToEdit}`
        )
        .then((action) => {
          setNewActionData(action.data[0]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (props.processType === "create")
      setHeaderMessage("Dodaj nową akcję dla klienta:");
  };

  const submitNewAction = (e) => {
    e.preventDefault();

    if (props.processType === "edit") {
      let path = `http://${config.db.url}:${config.db.port}/${config.db.collection.action}/edit/${props.idOfActionToEdit}`;

      axios
        .put(path, newActionData)
        .then((res) => {
          console.log(res);
          props.closeWindow();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (props.processType === "create") {
      let path = `http://${config.db.url}:${config.db.port}/${config.db.collection.action}/add/${props.customerData[0]}`;

      axios
        .post(path, newActionData)
        .then((res) => {
          console.log(res);
          props.closeWindow();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  console.log(newActionData);

  useState(() => {
    initializeFormData();
  }, []);

  return (
    <div className="popup-new-action">
      <div className="popup-new-action-content">
        <h2>{headerMessage}</h2>
        <h2>{props.customerData[1]}</h2>
        <form onSubmit={submitNewAction}>
          <label htmlFor="type">Typ akcji:</label>
          <CustomSelect
            selectOptions={config.action.selectOptions}
            id="type"
            name="type"
            value={newActionData.type}
            onChange={updateNewActionData}
          />
          <label htmlFor="description">Opis akcji:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={newActionData.description}
            onChange={updateNewActionData}
          />
          <label htmlFor="type">Data:</label>
          <input
            type="date"
            name="date"
            id="date"
            value={newActionData.date}
            onChange={updateNewActionData}
          />
          <button>Zapisz</button>
          <button onClick={props.closeWindow}>Anuluj</button>
        </form>
      </div>
    </div>
  );
};

export default NewAction;
