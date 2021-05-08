import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./signupForm.css";
import { signup } from "../../Api";

const SignupForm = (props) => {
  const { history } = props;
  const [signupData, setSignupData] = useState({
    email: undefined,
    password: undefined,
  });
  const [signupError, setSignupError] = useState({
    email: undefined,
    password: undefined,
  });

  useEffect(() => {
    if (localStorage.getItem("id")) {
      history.goBack();
    }
  }, [history]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (await checkValidation()) {
      const status = await signup(signupData);
      if (status === 201) {
        history.push("/users");
      }
    }
  };

  const checkValidation = () => {
    let obj = {};
    if (!signupData.email || signupData.email === "") {
      obj["email"] = "please enter an email";
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        signupData.email
      )
    ) {
      obj["email"] = "please enter a valid email address";
    }
    if (!signupData.password || signupData.password === "") {
      obj["password"] = "please enter the password";
    }
    if (
      signupData.password &&
      signupData.password.trim().split("").length < 8
    ) {
      obj["password"] = "password must be 8 characters long";
    }
    if (Object.keys(obj).length > 0) {
      setSignupError(obj);
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="signup-wrapper">
      <h2>SignUp</h2>
      <form>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="email"
            className={`form-control ${signupError.email ? "is-invalid" : ""}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          {signupError.email && (
            <div className="invalid-feedback">{signupError.email}</div>
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className={`form-control ${
              signupError.password ? "is-invalid" : ""
            }`}
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          {signupError.password && (
            <div className="invalid-feedback">{signupError.password}</div>
          )}
        </div>
        <button className="btn btn-primary mt-3" onClick={handleSignup}>
          SignUp
        </button>
        <div className="form-group mt-3">
          <Link to="/sign-in">Already have an account, SignIn</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
