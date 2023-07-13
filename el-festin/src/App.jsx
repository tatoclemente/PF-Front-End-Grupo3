import style from "./App.module.css";
import { Navbar } from "./Components/NavBar/NavBar";
import {Carousel} from "./Components/Carousel/Carousel"

function App() {
  return (
    <>
      <div className={style.appContainer}>
        <Navbar />
        <Carousel/>
      </div>
    </>
  );
}

export default App;
