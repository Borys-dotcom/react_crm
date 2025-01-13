import CustomSelect from "../components/CustomSelect";
import "./NewAction.css";
import config from "../config";
import axios from "axios";
import { useEffect, useState } from "react";

const NewAction = (props) => {
  const [customerList, setCustomerList] = useState([]);
  const [viewSelection, setViewSelection] = useState(false);

  const getCustomerList = () => {
    axios
      .get(
        `http://${config.db.url}:${config.db.port}/${config.db.collection.customer}/`
      )
      .then((res) => {
        setCustomerList(
          res.data.map((customer, index) => {
            return {key: `${customer._id}`, value: customer.name};
          })
        );
        setViewSelection(!viewSelection);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitNewAction = (e) => {
    e.preventDefault();
    console.log("zapisana");
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  return (
    <div className="popup-new-action">
      <div className="popup-new-action-content">
        <h2>Dodaj nową akcję</h2>
        <form onSubmit={submitNewAction}>
          <label htmlFor="customer">Klient</label>
          {viewSelection && <CustomSelect
            selectOptions={customerList}
            id="customer"
            name="customer"
            defaultSelection={props.defaultSelection}
            disabled = {true}
          />}
          <label htmlFor="type">Typ akcji:</label>
          <CustomSelect
            selectOptions={config.action.selectOptions}
            id="type"
            name="type"
          />
          <label htmlFor="description">Opis akcji:</label>
          <input type="text" name="description" id="description" />
          <label htmlFor="type">Data:</label>
          <input type="date" name="type" id="type" />
          <button>Zapisz</button>
          <button onClick={props.addNewActionShow}>Anuluj</button>
        </form>
      </div>
    </div>
  );
};

export default NewAction;
