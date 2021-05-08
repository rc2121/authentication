import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./loginForm.css";
import { signin } from "../../Api";
const LoginForm = (props) => {
  const { history } = props;
  const [loginData, setLoginData] = useState({
    email: undefined,
    password: undefined,
  });
  const [loginError, setLoginError] = useState({
    email: undefined,
    password: undefined,
  });

  useEffect(() => {
    if (localStorage.getItem("id")) {
      history.goBack();
    }
  }, [history]);

  const handleSignin = async (e) => {
    e.preventDefault();
    if (await checkValidation()) {
      const status = await signin(loginData);
      console.log("statuses  ssslogin::", status);
      if (status === 200) {
        history.push("/users");
      }
    }
  };

  const checkValidation = () => {
    let obj = {};
    if (!loginData.email || loginData.email === "") {
      obj["email"] = "please enter an email";
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        loginData.email
      )
    ) {
      obj["email"] = "please enter a valid email address";
    }
    if (!loginData.password || loginData.password === "") {
      obj["password"] = "please enter the password";
    }
    // if (loginData.password && loginData.password.trim().split('').length < 8) {
    //   obj['password'] = 'password must be 8 characters long';
    //
    if (Object.keys(obj).length > 0) {
      setLoginError(obj);
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="login-wrapper">
      <h2>SignIn</h2>
      <form>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className={`form-control ${loginError.email ? "is-invalid" : ""}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          {loginError.email && (
            <div className="invalid-feedback">{loginError.email}</div>
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className={`form-control ${
              loginError.password ? "is-invalid" : ""
            }`}
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          {loginError.password && (
            <div className="invalid-feedback">{loginError.password}</div>
          )}
        </div>
        <button className="btn btn-success mt-3" onClick={handleSignin}>
          Signin
        </button>
        <div className="form-group mt-3">
          <Link to="/sign-up">Don't have an account ?, SignUp here</Link>
        </div>
      </form>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default LoginForm;
