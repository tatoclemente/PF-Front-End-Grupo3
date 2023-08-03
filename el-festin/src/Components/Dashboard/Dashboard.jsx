
import { Navbar } from "../NavBar/NavBar.jsx";
import "./dashboard.css";
import { Sidebar } from "./Sidebar";
import { UsersData } from "./Metrics/UserMetrics/Users.jsx";
import { Dates } from "./Metrics/metrics";
import { Deleted } from "./Delete/Deleted";
import { useState } from "react";
import { Banner } from "./Landing/Banners/Banners";
import { Local } from "./Landing/LocalImages/Local";
import { DailySpecials } from "./Landing/DailySpecials/DailySpecials";

export const Dashboard = () => {



const [things, setThings] = useState(' ')
console.log(things)

const handleRender = (e) =>{
  const val = e.target.getAttribute('data-value')
  if(val === 'Market'){
    setThings('Market')
  }
  if(val === 'Metrics'){
    setThings('Metrics')
  }
  if(val === 'Users'){
    setThings('Users')
  }if(val === 'Products'){
    setThings('Products')
  }
}


  return ( 
    <>
      <div>
        <Navbar isDashboard={true} />
      </div>
      <div >
      <div className="containerALL" >

      <Sidebar handleRender={handleRender} setThings={setThings} />

      
          
          
          { things === 'Market' ?
          <div className='marketingContent' >
            <Banner />
            <Local />
            <DailySpecials/>
          </div>
        : null}
        <div>
        {/* <h6>Dashboard</h6> */}
  </div>
  {things === 'Metrics' ? <div className="metricContent">
      <Dates/>
      </div> : things === 'Products' ? <div className="metricContent">
      <Dates/>
      </div> : null}
      {things === 'Users' ? <div className="metricContent">
   <UsersData/>
      </div>: null}

    </div>
    </div>
    </>
  );
};
