import React, { useState, useContext } from "react";
import { AuthContext } from "App";
const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = useState(initialState);
  const handleInputChanges = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setData({ ...data, isSubmitting: true, errorMessage: null });
    try {
      const response = await (
        await fetch("https://hookedbe.herokuapp.com/api/login", {
          method: "post",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            username: data.email,
            password: data.password,
          }),
        })
      ).json();
      dispatch({ type: "LOGIN", payload: response });
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message || error.statusText,
      });
    }
  };
  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>
            <label htmlFor="email">
              Email Address
              <input
                type="text"
                value={data.email}
                onChange={handleInputChanges}
                name="email"
                id="email"
              />
            </label>
            <label htmlFor="password">
              Password Address
              <input
                type="password"
                value={data.password}
                onChange={handleInputChanges}
                name="password"
                id="password"
              />
            </label>
            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}
            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? "...Loading" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
