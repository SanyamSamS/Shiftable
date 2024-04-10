import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const LoginForm = () => {
  const [employeeCredentials, setEmployeeCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginAlert, setLoginAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeCredentials({ ...employeeCredentials, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(employeeCredentials);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
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
          console.log(err);
          setLoginAlert("An error occurred. Please try again later.");
          setEmployeeCredentials({ ...employeeCredentials, password: "" });
          return;
        }
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <section className="login-component">
      <h2>Employee Log In</h2>
      <form className="login-form" onSubmit={handleFormSubmit}>
        <section className="input-container">
          <input
            className="input-field"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
            value={employeeCredentials.username}
          />
          <input
            className="input-field"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            value={employeeCredentials.password}
          />
        </section>
        <section className="button-container">
          <button
            className="submit-button"
            type="submit"
            disabled={!(employeeCredentials.username && employeeCredentials.password)}>
            {loading ? "Logging in ..." : "Log in"}
          </button>
        </section>
        {loginAlert && (
          <div className="login-alert" role="alert">
            {loginAlert}
          </div>
        )}
      </form>
    </section>
  );
};

export default LoginForm;
