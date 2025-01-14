import CustomSelect from "../components/CustomSelect";
import "./NewAction.css";
import config from "../config";
import axios from "axios";
import { useEffect, useState } from "react";

const NewAction = (props) => {
  const [newActionData, setNewActionData] = useState({name: props.customerData[1], customerRef: props.customerData[0]});

  const updateNewActionData = (e) => {
    setNewActionData((prevNewActionData) => {
      return {...prevNewActionData, [e.target.name]: e.target.value}
    })
  }

  // console.log(newActionData);

  const submitNewAction = (e) => {
    e.preventDefault();
    
    let path = `http://${config.db.url}:${config.db.port}/${config.db.collection.action}/add/${props.customerData[0]}`;

    axios.post(path, newActionData)
    .then((res) => {
      console.log(res);
      props.closeWindow();
    })
    .catch((err) => {
      console.error(err);
    })

  };

  return (
    <div className="popup-new-action">
      <div className="popup-new-action-content">
        <h2>Dodaj nową akcję dla klienta:</h2>
        <h2>{props.customerData[1]}</h2>
        <form onSubmit={submitNewAction} onChange={updateNewActionData}>
          <label htmlFor="type">Typ akcji:</label>
          <CustomSelect
            selectOptions={config.action.selectOptions}
            id="type"
            name="type"
            onChange={updateNewActionData}
          />
          <label htmlFor="description">Opis akcji:</label>
          <input type="text" name="description" id="description" onChange={updateNewActionData} />
          <label htmlFor="type">Data:</label>
          <input type="date" name="date" id="date" onChange={updateNewActionData} />
          <button>Zapisz</button>
          <button onClick={props.addNewActionShow}>Anuluj</button>
        </form>
      </div>
    </div>
  );
};

export default NewAction;
