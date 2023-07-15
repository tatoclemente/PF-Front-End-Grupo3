import { useState } from "react";
import HomeComponents from "../../Components/HomeComponents"
import style from "./Home.module.css"

const Home = () => {
  const { CardsContainer, FiltersAndSorts, FeaturedCategories } = HomeComponents;
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={style.homeContainer}>
      <div className={style.mainContent}>
        <div
          style={
            isCollapsed
              ? { width: "5px", transition: "width 0.5s ease-in-out" }
              : { transition: "width 0.5s ease-in-out" }
          }
          className={style.sideBar}
        >
          <FiltersAndSorts state={[isCollapsed, setIsCollapsed]} />
        </div>
        <div
          className={style.productsContent}
          style={
            isCollapsed
              ? { width: "calc(100% - 5px)", transition: "width 0.5s ease-in-out" }
              : { transition: "width 0.5s ease-in-out" }
          }
        >
          <FeaturedCategories />
          <CardsContainer />
        </div>
      </div>
      <div className={style.footer}>hola</div>
    </div>
  );
};


// const Home = () => {

//   const { CardsContainer, FiltersAndSorts, FeaturedCategories } = HomeComponents;
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   return (
//     <div className={style.homeContainer}>
//       <div className={style.mainContent}>
//         <div style={isCollapsed ? { width: "5px" } : {}} className={style.sideBar}>
//           <FiltersAndSorts 
//             state={[isCollapsed, setIsCollapsed]} /> 
//         </div>
//         <div className={style.productsContent} style={isCollapsed ? { width: "100%", transition: 'width 0.5s ease-in-out' } : {}}>
//           <FeaturedCategories />
//           <CardsContainer />
//         </div>
//       </div>
//       <div className={style.footer}>
//         hola
//       </div>
//     </div>
//   );
// };

export default Home;