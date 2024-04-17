import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpEmployee } from "../api"; // Update this to the sign-up API function
import Cookies from "js-cookie";
// import ReCAPTCHA from "react-google-recaptcha";
// npm install react-google-recaptcha << have not done that yet


const EmployeeSignUpForm = () => {
  const [employeeInfo, setEmployeeInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    confirmUsername: "",
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

    //   Check if the reCAPTCHA token is available
    //   if (!recaptchaToken) {
    //     setSignupAlert("Please complete the reCAPTCHA verification.");
    //     return;
    //   }

    // Check honeypot field
    if (employeeInfo.confirmUsername !== "") {
      console.log("Bot detected!");
      return;
    }

    setLoading(true);

    try {
    //  replace "const response = await signUpEmployee(employeeInfo);" with the following code once recaptcha is implemented
    //   // Call the sign-up API function with the reCAPTCHA token
    //   const response = await signUpEmployee({
    //     ...employeeInfo,
    //     recaptchaToken,
    //   });
      const response = await signUpEmployee(employeeInfo); // Call the sign-up API function
      const { token } = response.data;
      Cookies.set("token", token);
      navigate("/employeeDashboard");
    } catch (err) {
      // Handle sign-up errors
      console.log(err);
      setSignupAlert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="employee-signup-component">
      <h2>Employee Sign Up</h2>
      <form className="employee-signup-form" onSubmit={handleSignUpSubmit}>
        <section className="input-container">
          <input
            className="input-field"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
            value={employeeInfo.username}
          />
          <input
            className="input-field"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={employeeInfo.email}
          />
          <input
            className="input-field"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            value={employeeInfo.password}
          />
          <input
            className="input-field"
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

        <section className="button-container">
          <button
            className="submit-button"
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
        </section>
        {signupAlert && (
          <div className="signup-alert" role="alert">
            {signupAlert}
          </div>
        )}
      </form>
    </section>
  );
};

export default EmployeeSignUpForm;