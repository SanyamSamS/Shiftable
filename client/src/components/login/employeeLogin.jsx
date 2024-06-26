import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import closeIcon from "../../assets/svg/cancel-close-svgrepo-com.svg";

// import { loginEmployee } from "../api"; //commented out until backend is ready
import Cookies from "js-cookie";

import "./employeeLogin.css";

const EmployeeLoginForm = ({ isOpen, onClose }) => {
  //    set initial states
  const [employeeCredentials, setEmployeeCredentials] = useState({
    username: "",
    password: "",
    confirmUsername: "",
  });
  const [loginAlert, setLoginAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeCredentials({ ...employeeCredentials, [name]: value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    //Initialize  flag
    let isFormValid = true;

    if (employeeCredentials.username == "") {
      setLoginAlert("Please enter your username.");
      isFormValid = false;
    } else if (employeeCredentials.password == "") {
      setLoginAlert("Please enter your password.");
      isFormValid = false;
    }

    // Check honeypot field, if filled, likely a bot. Does not user honeypot as a identifier to prevent bots who have been trained to ignore terms like "honeypot" or "spam trap".
    else if (employeeCredentials.confirmUsername !== "") {
      console.log("Bot detected!");
      return;
    }

    if (!isFormValid) {
      return;
    }

    //    set loading state to true for the button
    setLoading(true);

    try {
      const loginResponse = await loginEmployee(employeeCredentials);
      const { token } = loginResponse.data;
      //     set the token as a cookie, safer than storing it in local storage, then redirect user to dashboard
      Cookies.set("token", token);
      navigate("/employeeDashboard");
    } catch (err) {
      //     different error messages for the user
      if (err.response) {
        if (err.response.status === 404) {
          setLoginAlert("User not found. Please check your credentials.");
          setEmployeeCredentials({ ...employeeCredentials, password: "" });
          return;
        } else if (err.response.status === 401) {
          setLoginAlert("Incorrect password. Please try again.");
          setEmployeeCredentials({ ...employeeCredentials, password: "" });
          return;
        } else {
          //    only this will have a console.log because it's not a user input error
          console.log(err);
          setLoginAlert("An error occurred. Please try again later.");
          setEmployeeCredentials({ ...employeeCredentials, password: "" });
          return;
        }
      }
    } finally {
      //    revert button state
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setLoginAlert("");
    setEmployeeCredentials({
      username: "",
      password: "",
      confirmUsername: "",
    });
    onClose();
  };

  return (
    <section className={`login-modal-container ${isOpen ? "open" : ""}`}>
      <section className={`modal employee-login-component`}>
        <h2 className="card-title">Employee Log In</h2>
        <button className="login-close" onClick={handleCloseModal}>
          <img src={closeIcon} alt="close button" />
        </button>
        <form className="employee-login-form" onSubmit={handleLoginSubmit}>
          <section className="input-container">
            <input
              className="login-input-field"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
              value={employeeCredentials.username}
            />
            <input
              className="login-input-field"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={employeeCredentials.password}
            />
            <input
              //honeypot trap.is not visible to user by setting display to none, but bots will still "see" it.
              className="confirm-username"
              type="text"
              id="confirm-username"
              name="confirm-username"
              placeholder="Leave this field empty"
              onChange={handleInputChange}
              value={employeeCredentials.confirmUsername}
            />
          </section>
          {/* <section className="button-container"> */}
          <button
            className="login-button"
            type="submit"
            disabled={
              !(employeeCredentials.username && employeeCredentials.password)
            }
          >
            {/* when user clicks the button, it's text will change to Logging in */}
            {loading ? "Logging in ..." : "Log in"}
          </button>
          {/* </section> */}
          {loginAlert && (
            // conditional rendering of the error messages when it occurs
            <div className="login-alert" role="alert">
              {loginAlert}
            </div>
          )}
        </form>
      </section>
    </section>
  );
};

EmployeeLoginForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EmployeeLoginForm;
