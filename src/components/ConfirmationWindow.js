import "./ConfirmationWindow.css"

const ConfirmationWindow = (props) => {



  return (
    <div className="popup-window">
      <div className="popup-content">
        <div>{props.message}</div>
        <div className="button-container">
          <button onClick={props.clickedYes} id={props.idOfTarget} className="button-yes">
            Tak
          </button>
          <button
            onClick={props.clickedNo}
            className="button-no"
          >
            Nie
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationWindow
