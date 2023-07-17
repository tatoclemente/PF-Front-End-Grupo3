import React, { useEffect } from "react";
import ravioles from "./images/ravioles.jpg";
import agua from "./images/agua.png";
import cocacola from "./images/cocacola.png";
import sprite from "./images/sprite.jpg";
import tiramisu from "./images/tiramisu.jpg";
import alfajor from "./images/alfajor.jpg";
import ravioles2 from "./images/ravioles2.jpg";
import styles from "./DetailPage.module.css";
import { sides } from "../../utils/mock";

const Detail = ({ dishDetail }) => {

  const pastaGarnish = sides.filter((side) => side.type === "salsas");

  const resGarnish = sides.filter((side) => side.type === "acompañamientos");

  const sandwichGarnish = sides.filter((side) => side.name === "papas fritas");

  const garnish =
    dishDetail.subtype === "pastas"
      ? pastaGarnish
      : dishDetail.subtype === "carnes"
      ? resGarnish
      : dishDetail.subtype === "sandwich"
      ? sandwichGarnish
      : [];

  return (
    <div className={styles.container}>
      <div className={styles.leftInfo}>
        <h1 className={styles.name}>{dishDetail.name}</h1>
        <img
          src={dishDetail.image}
          className={styles.mainImage}
          alt={dishDetail.name}
        />
        <div className={styles.additionalContainer}>
          <p className={styles.guarnicionTitle}>seleccione una guarnición</p>
          <div className={styles.guarnicionContent}>
            {garnish.map((side, index) => {
              return (
                <div className={styles.guarnicionContainer} key={index}>
                  <img
                    src={ravioles2}
                    className={styles.secondaryImage}
                    alt="Otra imagen de Ravioles de Jamón y Queso"
                  />
                  <div className={styles.guanicionNameContainer}>
                    <span className={styles.guarnicionName}>{side.name}</span>
                  </div>
                  <h5 className={styles.secondaryPrices}>{`$ ${side.price}`}</h5>                  
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.selectedAdditionalContainer}>
          <div className={styles.selectedAdditional}>
            <img
              src={agua}
              className={styles.secondaryImage}
              alt="Agua mineral sin gas"
            />
          </div>
        </div>
        <div className={styles.containerPrice}>
          <h2
            className={styles.titles}
          >{`Suma total: $ ${dishDetail.price}`}</h2>
        </div>
      </div>

      <div className={styles.rightInfo}>
        <h2 className={styles.title}>
          ¿Con qué te gustaría acompañar tu orden?
        </h2>
        <h3 className={styles.subTitles}>Bebidas</h3>
        <div className={styles.containerInfo}>
          <div className={styles.imageWithInfo}>
            <img
              src={cocacola}
              className={styles.secondaryImage}
              alt="Coca-Cola"
            />
            <div className={styles.secondaryNameContainer}>
              <h4 className={styles.secondaryNames}>Coca-Cola</h4>
            </div>
            <h5 className={styles.secondaryPrices}>+ $500</h5>
          </div>
          <div className={styles.imageWithInfo}>
            <img src={sprite} className={styles.secondaryImage} alt="Sprite" />
            <div className={styles.secondaryNameContainer}>
              <h4 className={styles.secondaryNames}>Sprite</h4>
            </div>
            <h5 className={styles.secondaryPrices}>+ $500</h5>
          </div>
          <div className={styles.imageWithInfo}>
            <img
              src={agua}
              className={styles.secondaryImage}
              alt="Agua mineral sin gas"
            />
            <div className={styles.secondaryNameContainer}>
              <h4 className={styles.secondaryNames}>Agua mineral sin gas</h4>
            </div>
            <h5 className={styles.secondaryPrices}>+ $400</h5>
          </div>
        </div>
        <h3 className={styles.subTitles}>Postres</h3>
        <div className={styles.containerInfo}>
          <div className={styles.imageWithInfo}>
            <img
              src={tiramisu}
              className={styles.secondaryImage}
              alt="Tiramisú"
            />
            <h4 className={styles.secondaryNames}>Tiramisú</h4>
            <h5 className={styles.secondaryPrices}>+ $2000</h5>
          </div>
          <div className={styles.imageWithInfo}>
            <img
              src={alfajor}
              className={styles.secondaryImage}
              alt="Alfajor"
            />
            <h4 className={styles.secondaryNames}>Alfajor</h4>
            <h5 className={styles.secondaryPrices}>+ $1000</h5>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonAdd}
            onClick={() =>
              window.confirm(
                `Esta por agregar ${dishDetail.name} al carrito, es correcto?`
              )
            }
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
