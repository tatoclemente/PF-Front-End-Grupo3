import { Navbar } from "../NavBar/NavBar.jsx";
import "./dashboard.css";
import { Sidebar } from "./Sidebar";
import { UsersData } from "./Metrics/Users/Users.jsx";
import { Dates } from "./Metrics/metrics";
import {AllRequest} from './Requests/AlRequests.jsx'
import { useState } from "react";
import { Banner } from "./Landing/Banners/Banners";
import { Local } from "./Landing/LocalImages/Local";
import { DailySpecials } from "./Landing/DailySpecials/DailySpecials";
import { Reservation } from "./Reservations/Reservation.jsx";


export const Dashboard = ({ currentUser }) => {
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
    if (val === "Products") {
      setThings("Products");
    } if(val === "Requests"){
      setThings("Requests")
    }
  };

  return (
    <>
      <div>
        <Navbar isDashboard={true} />
      </div>
      <div>
        <div className="containerALL">
          <Sidebar handleRender={handleRender} setThings={setThings} />

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
              <UsersData currentUser={currentUser}/>
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
    </>
  );
};
