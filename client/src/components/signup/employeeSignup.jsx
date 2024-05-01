import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

// import { signUpEmployee, checkAvailability } from "../api"; // Update this to the sign-up API function, commented out till backend is ready
import Cookies from "js-cookie";
import emailRegex from "../../utils/helpers/emailRegex";
import passwordRegex from "../../utils/helpers/passwordRegex";
import usernameRegex from "../../utils/helpers/username";
// import ReCAPTCHA from "react-google-recaptcha";
// npm install react-google-recaptcha << have not done that yet

import "./employeeSignup.css"

const EmployeeSignUpForm = ({ isOpen, onClose }) => {
  const [employeeInfo, setEmployeeInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmUsername: "", // this is a honeypot
  });
  const [signupAlert, setSignupAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  //   const [recaptchaToken, setRecaptchaToken] = useState("");

  //   const handleRecaptchaChange = (token) => {
  //     setRecaptchaToken(token);
  //   };

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeInfo({ ...employeeInfo, [name]: value });
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const isValidEmail = emailRegex.test(employeeInfo.email);
    const isValidPassword = passwordRegex.test(employeeInfo.password);
    const isValidUsername = usernameRegex.test(employeeInfo.username)

    //Initialize  flag
    let isFormValid = true;

    // Form validation checks
    if (employeeInfo.username === "") {
      setSignupAlert("Please enter a username.");
      isFormValid = false;
    } else if (!isValidUsername){
      setSignupAlert("Please enter a valid username.");
      isFormValid = false
    } else if (employeeInfo.email === "") {
      setSignupAlert("Please enter a email.");
      isFormValid = false;
    } else if (!isValidEmail) {
      setSignupAlert("Please enter a valid email address.");
      isFormValid = false;
    } else if (employeeInfo.password === "") {
      setSignupAlert("Please enter a password.");
      isFormValid = false;
    } else if (!isValidPassword) {
      setSignupAlert("Password must contain at least 1 upper case letter, 1 lower case letter, 1 number, and 1 special character.");
      isFormValid = false;
    } else if (employeeInfo.confirmPassword !== employeeInfo.password || employeeInfo.confirmPassword === "") {
      setSignupAlert("Failed to confirm password. Please try again.");
      isFormValid = false;
    }

    //   Check if the reCAPTCHA token is available
    //    else if (!recaptchaToken) {
    //     setSignupAlert("Please complete the reCAPTCHA verification.");
    //     isFormValid = false;
    //   }

    // Check honeypot field
    else if (employeeInfo.confirmUsername !== "") {
      console.log("Bot detected!");
      isFormValid = false;
    }

    // If form is not valid, return
    if (!isFormValid) {
      return;
    }

    setLoading(true);

    try {
      // additional checks for availability
      const response = await checkAvailability(
        employeeInfo.username,
        employeeInfo.email,
        employeeInfo.password
      );
      if (response.usernameTaken) {
        setSignupAlert("Username is already taken. Please choose a different username.");
        return;
      } else if (response.emailTaken) {
        setSignupAlert("Email is already taken. Please use a different email.");
        return;
      } else if (response.passwordTaken) {
        setSignupAlert("Password is already taken. Please choose a different password.");
        return;
      } else {
        //  replace "const response = await signUpEmployee(employeeInfo);" with the following code once recaptcha is implemented
        //   // Call the sign-up API function with the reCAPTCHA token
        //   const response = await signUpEmployee({
        //     ...employeeInfo,
        //     recaptchaToken,
        //   });
        // If none of the fields are taken, proceed with the sign-up process
        const signUpResponse = await signUpEmployee(employeeInfo);
        const { token } = signUpResponse.data;
        Cookies.set("token", token);
        navigate("/employeeDashboard");
      }
    } catch (err) {
      // Handle sign-up errors
      console.log(err);
      setSignupAlert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`modal employee-signup-component ${isOpen ? "open" : ""}`}>
      <h2 className="card-title">Employee Sign Up</h2>
      <span className="close" onClick={onClose}>&times;</span>

      <form className="employee-signup-form" onSubmit={handleSignUpSubmit}>
        <section className="input-container">
          <input
            className="signup-input-field"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
            value={employeeInfo.username}
          />
          <input
            className="signup-input-field"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={employeeInfo.email}
          />
          <input
            className="signup-input-field"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            value={employeeInfo.password}
          />
          <input
            className="signup-input-field"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleInputChange}
            value={employeeInfo.confirmPassword}
          />
          <input
            className="confirm-username"
            type="text"
            id="confirm-username"
            name="confirm-username"
            placeholder="Leave this field empty"
            onChange={handleInputChange}
            value={employeeInfo.confirmUsername}
          />
          {/* <ReCAPTCHA sitekey="YOUR_SITE_KEY" onChange={handleRecaptchaChange} /> */}
        </section>

        {/* <section className="button-container"> */}
          <button
            className="signup-button"
            type="submit"
            disabled={
              !(
                employeeInfo.username &&
                employeeInfo.email &&
                employeeInfo.password &&
                employeeInfo.confirmPassword
              )
            }
          >
            {loading ? "Signing up ..." : "Sign Up"}
          </button>
        {/* </section> */}
        {signupAlert && (
          <div className="signup-alert" role="alert">
            {signupAlert}
          </div>
        )}
      </form>
    </section>
  );
};

EmployeeSignUpForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EmployeeSignUpForm;