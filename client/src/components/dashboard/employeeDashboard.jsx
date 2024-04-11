import { Link, Redirect, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import viewShiftsIcon from "../../assets/svg/vision-svgrepo-com.svg";
import advertiseIcon from "../../assets/svg/megaphone-svgrepo-com.svg";
import viewSwapsIcon from "../../assets/svg/sort-swap-svgrepo-com.svg";

const EmployeeDashboard = () => {
  const history = useHistory();

  //   check if token exists and return boolean
  function isAuthenticated() {
    const token = Cookies.get("token");
    return token ? true : false;
  }
  //   if no token exists, redirects user to login
  if (!isAuthenticated()) {
    return <Redirect to="/employeeLogin" />;
  }

  //   remove token on log out, redirects user to login
  function handleLogout() {
    Cookies.remove("token");
    history.push("/employeeLogin");
  }

  return (
    <section className="employee-dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <div className="dashboard-navigation">
        <ul className="navigation-list">
          <li className="navigation-item">
            <img className="dashboard-icon" src={viewShiftsIcon} alt="" />
            <Link to="/view-shifts">View your upcoming shifts.</Link>
          </li>
          <li className="navigation-item">
            <img className="dashboard-icon" src={advertiseIcon} alt="" />
            <Link to="/advertise-swap">Advertise your own swap.</Link>
          </li>
          <li className="navigation-item">
            <img className="dashboard-icon" src={viewSwapsIcon} alt="" />
            <Link to="/view-swaps">View available swaps.</Link>
          </li>
        </ul>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </section>
  );
};

export default EmployeeDashboard;
