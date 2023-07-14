import React from "react";
import ravioles from "./images/ravioles.jpg";
import agua from "./images/agua.png";
import cocacola from "./images/cocacola.png";
import sprite from "./images/sprite.jpg";
import tiramisu from "./images/tiramisu.jpg";
import alfajor from "./images/alfajor.jpg";
import ravioles2 from "./images/ravioles2.jpg";
import styles from "./DetailPage.module.css";

const Detail = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftInfo}>
        <h1 className={styles.name}>Ravioles de Jamón y Queso</h1>
        <img src={ravioles} className={styles.mainImage} alt="Ravioles de Jamón y Queso" />
        <img src={ravioles2} className={styles.secondaryImage} alt="Otra imagen de Ravioles de Jamón y Queso" />
        <div className={styles.containerPrice}>
          <h2 className={styles.titles}>Total: $5000</h2>
        </div>
      </div>
      <div className={styles.rightInfo}>
        <h2 className={styles.titles}>¿Con qué te gustaría acompañar tu orden?</h2>
        <h3 className={styles.titles}>Bebidas</h3>
        <div className={styles.containerInfo}>
          <div className={styles.imageWithInfo}>
            <img src={cocacola} className={styles.secondaryImage} alt="Coca-Cola" />
            <h4 className={styles.secondaryNames}>Coca-Cola</h4>
            <h5 className={styles.secondaryPrices}>+ $500</h5>
          </div>
          <div className={styles.imageWithInfo}>
            <img src={sprite} className={styles.secondaryImage} alt="Sprite" />
            <h4 className={styles.secondaryNames}>Sprite</h4>
            <h5 className={styles.secondaryPrices}>+ $500</h5>
          </div>
          <div className={styles.imageWithInfo}>
            <img src={agua} className={styles.secondaryImage} alt="Agua mineral sin gas" />
            <h4 className={styles.secondaryNames}>Agua mineral sin gas</h4>
            <h5 className={styles.secondaryPrices}>+ $400</h5>
          </div>
        </div>
        <h3 className={styles.titles}>Postres</h3>
        <div className={styles.containerInfo}>
          <div className={styles.imageWithInfo}>
            <img src={tiramisu} className={styles.secondaryImage} alt="Tiramisú" />
            <h4 className={styles.secondaryNames}>Tiramisú</h4>
            <h5 className={styles.secondaryPrices}>+ $2000</h5>
          </div>
          <div className={styles.imageWithInfo}>
            <img src={alfajor} className={styles.secondaryImage} alt="Alfajor" />
            <h4 className={styles.secondaryNames}>Alfajor</h4>
            <h5 className={styles.secondaryPrices}>+ $1000</h5>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonAdd}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
