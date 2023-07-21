import { useState } from "react";
import { useTaskContext } from "../context/GlobalContext";
import Modal from "./Modal";

function NewTask() {
  const [title, setTitle] = useState("");
  const { addTask, message, setMessage } = useTaskContext();

  const handleInput = (e) => {
    setTitle(e.target.value);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      setMessage("This field is required!");
      return;
    }

    let sentence = title.slice(0, 1).toUpperCase() + title.slice(1);
    addTask({
      id: window.crypto.randomUUID(),
      title: sentence,
      complete: false,
    });
    setTitle("");
  };
  return (
    <div className="form_container">
      <form className="newtask main_child" onSubmit={handleSubmit}>
        <span className="title_check"></span>
        <input
          type="text"
          placeholder="Create a new todo..."
          value={title}
          onInput={handleInput}
          maxLength={40}
        />
      </form>
      {message ? <Modal /> : null}
    </div>
  );
}

export default NewTask;
