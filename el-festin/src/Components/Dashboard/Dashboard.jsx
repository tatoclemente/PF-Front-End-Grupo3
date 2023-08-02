import { Navbar } from "../NavBar/NavBar.jsx";
import Styles from "./Dashboard.module.css";
import "./dashboard.css";

import { Sidebar } from "./Sidebar";

import { Dates } from "./Metrics/metrics";

import { useState } from "react";
import { Banner } from "./Landing/Banners/Banners";
import { Local } from "./Landing/LocalImages/Local";
import { DailySpecials } from "./Landing/DailySpecials/DailySpecials";

export const Dashboard = () => {
  const [showMarketingInfo, setShowMarketingInfo] = useState(false);

  const handleMarketingButtonClick = () => {
    setShowMarketingInfo(!showMarketingInfo);
  };

  const [things, setThings] = useState(false);
  console.log(things);

  const handleRender = () => {
    if (things === false) {
      setThings(true);
    }
    if (things === true) {
      setThings(false);
    }
  };

  return (
    <>
      <div>
        <Navbar isDashboard={true} />
      </div>

      <Sidebar />

      <div className={Styles.dashboardContainer}>
        <li>
          <div className="container-fluid text-dark">
            <button
              type="button"
              className={`btn btn-primary ${Styles.buttonDelete}`}
              onClick={handleMarketingButtonClick}>
              Marketing
            </button>
          </div>
        </li>

        {showMarketingInfo && (
          <div className={Styles.marketingContent}>
            <Banner />
            <Local />
            <DailySpecials />
          </div>
        )}
      </div>
      {/* <h6>Dashboard</h6> */}

      <li>
        <button onClick={handleRender}>Datos</button>
      </li>

      {things === true ? (
        <div className={Styles.containerMetrics}>
          <Dates />
        </div>
      ) : null}
    </>
  );
};
