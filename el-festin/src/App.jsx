import style from "./App.module.css";
import { Navbar } from "./Components/NavBar/NavBar";

function App() {
  return (
    <>
      <div className={style.appContainer}>
        <Navbar />
      </div>
    </>
  );
}

export default App;
