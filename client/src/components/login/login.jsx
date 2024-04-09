import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// note created yet //
import { useAuth } from "../src/util/useAuth";

const LoginForm = () => {
  return (
    <section className="login-component">
      <form className="login-form" onSubmit={handleFormSubmit}>
        <section className="input-container">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
        </section>
        <section className="button-container">
          <button type="submit">Log In</button>
        </section>
      </form>
    </section>
  );
};

export default LoginForm;
