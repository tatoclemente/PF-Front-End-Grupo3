import style from "./Suggestions.module.css";
import ravioles from "../../DetailPage/images/ravioles.jpg";
import ensalada from "./images/ensalada.jpg";
import ceviche from "./images/ceviche.jpg";

const Suggestions = () => {
  return (
    <div>
      <h2 className={style.title}>SUGERENCIAS DEL DIA</h2>
      <div className={style.container}>
        <div className={style.cardSuggestions}>
          <img src={ravioles} alt="ravioles" />
          <h2>Ravioles de Jamón y Queso</h2>
        </div>

        <div className={style.cardSuggestions}>
          <img src={ensalada} alt="ensalada" />
          <h2>Ensalada Caprese</h2>
        </div>

        <div className={style.cardSuggestions}>
          <img src={ceviche} alt="ceviche" />
          <h2>Ceviche de Camarón</h2>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
