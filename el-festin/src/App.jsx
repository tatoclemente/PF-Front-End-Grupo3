import style from "./App.module.css";
//import { Navbar } from "./Components/NavBar/NavBar";
import { LoginPage } from "./Views/Login/LoginPage";

function App() {
  return (
      <div className={style.appContainer}>
        <LoginPage />
      </div>
  );
}

export default App;
