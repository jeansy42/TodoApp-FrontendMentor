import "../assets/styles/Modal.sass";
import { useTaskContext } from "../context/GlobalContext";

function Modal() {
  const { message, toggle } = useTaskContext();
  return (
    <div className={`modal ${toggle ? "dark" : ""}`}>
      <div className="modal_content">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Modal;
