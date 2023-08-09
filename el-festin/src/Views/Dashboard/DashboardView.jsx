import { Dashboard } from "../../Components/Dashboard/Dashboard";

export const DashboardView = ({ currentUser }) => {
  return (
    <>
      <Dashboard currentUser={currentUser} />
    </>
  );
};
