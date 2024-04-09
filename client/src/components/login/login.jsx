import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(userFormData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="login-component">
      <form className="login-form" onSubmit={handleFormSubmit}>
        <section className="input-container">
          <input
            className="input-field"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
            value={userFormData.username}
          />
          <input
            className="input-field"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            value={userFormData.password}
          />
        </section>
        <section className="button-container">
          <button className="submit-button" type="submit">
            Log In
          </button>
        </section>
      </form>
    </section>
  );
};

export default LoginForm;
