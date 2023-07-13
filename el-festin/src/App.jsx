import style from "./App.module.css";
import { Navbar } from "./Components/NavBar/NavBar";
import Maps from "./Views/Maps/Maps";

function App() {
  return (
    <>
      <div className={style.appContainer}>
        <Navbar />
        <Maps/>
      </div>
    </>
  );
}

export default App;
