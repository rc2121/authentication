import React, { useState } from "react";
import { Link } from 'react-router-dom'
import "./signupForm.css";
import { signup } from '../../Api';

const SignupForm = (props) => {
  const { history } = props;
  const [signupData, setSignupData] = useState({
    email: undefined,
    password: undefined,
  });
  const handleSignup = async(e) => {
    e.preventDefault();
    const status = await signup(signupData);
    if (status === 201) { 
      history.push('/users');
    }
  };
  console.log("NEW LOGINLLLL:", signupData);
  return (
    <div className="signup-wrapper">
      <h2>SignUp</h2>
      <form>
        <div className="form-group mt-3">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setSignupData({...signupData, email: e.target.value})}
          />
        </div>
        <div className="form-group mt-3">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setSignupData({...signupData, password: e.target.value})}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleSignup}>
          SignUp
        </button>
        <div className="form-group mt-3">
          <Link to='/sign-in'>Already have an account, SignIn</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
