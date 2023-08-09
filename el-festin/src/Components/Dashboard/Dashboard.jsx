import { Navbar } from "../NavBar/NavBar.jsx";
import "./dashboard.css";
import { Sidebar } from "./Sidebar";
import { UsersData } from "./Metrics/Users/Users.jsx";
import { Dates } from "./Metrics/metrics";
import { AllRequest } from './Requests/AlRequests.jsx'
import { useState } from "react";
import { Banner } from "./Landing/Banners/Banners";
import { Local } from "./Landing/LocalImages/Local";
import { DailySpecials } from "./Landing/DailySpecials/DailySpecials";
import { Reservation } from "./Reservations/Reservation.jsx";


export const Dashboard = () => {
  const [things, setThings] = useState("Requests");
  // console.log(things)

  const handleRender = (e) => {
    const val = e.target.getAttribute("data-value");
    if (val === "Market") {
      setThings("Market");
    }
    if (val === "Reser") {
      setThings("Reser");
    }
    if (val === "Metrics") {
      setThings("Metrics");
    }
    if (val === "Users") {
      setThings("Users");
    }
    if (val === "Requests") {
      setThings("Requests")
    }
  };

  return (
    <div className='dashboard-container'>
      <div>
        <Navbar isDashboard={true} />
      </div>
        <div className="containerALL">
          <div>
            <Sidebar handleRender={handleRender} setThings={setThings} />
          </div>

          <div className='contentContainer'>
            {things === "Market" ? (
              <div className="marketingContent">
                <Banner />
                <Local />
                <DailySpecials />
              </div>
            ) : null}

            {things === "Metrics" ? (
              <div className="metricContent">
                <Dates />
              </div>
            ) : null}

            {things === "Users" ? (
              <div className="metricContent">
                <UsersData />
              </div>
            ) : null}
            {things === "Reser" ? (
              <div className="reserContent">
                <Reservation />
              </div>
            ) : null}
            {things === "Requests" ? (
              <div className="requestsContent">
                <AllRequest />
              </div>
            ) : null}
          </div>

        </div>
      </div>
  );
};
