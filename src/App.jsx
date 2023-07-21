import "./App.sass";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import Footer from "./layouts/Footer";
import { useTaskContext } from "./context/GlobalContext";
function App() {
  const { toggle } = useTaskContext();
  return (
    <div className="global_container">
      <div className={`background_container ${toggle ? "dark" : ""}`}></div>
      <div className="todo_container">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
