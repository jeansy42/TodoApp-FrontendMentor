import "../assets/styles/Header.sass";
import { useTaskContext } from "../context/GlobalContext";
function Header() {
  const { setToggle, toggle } = useTaskContext();
  const handleClick = () => setToggle(!toggle);
  return (
    <div className={`header ${toggle ? "dark" : ""}`} role="banner">
      <h1>TODO</h1>
      <span onClick={handleClick} className="toggle"></span>
    </div>
  );
}

export default Header;
