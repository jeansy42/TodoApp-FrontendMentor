import { useTaskContext } from "../context/GlobalContext";

function Footer() {
  const { toggle } = useTaskContext();
  return (
    <div role="feed" className={`footer ${toggle ? "dark" : ""}`}>
      <p>Drag and drop to reorder list</p>
    </div>
  );
}

export default Footer;
