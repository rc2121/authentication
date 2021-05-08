import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './loginForm.css';
import { signin } from '../../Api';
const LoginForm = (props) => {
    const { history } = props;
    const [ loginData, setLoginData ] = useState({
        email: undefined,
        password: undefined
    });

    useEffect(() => {
      if (localStorage.getItem('id')) {
        history.goBack()
      }
    }, [])

    const handleSignin = async(e) => {
        e.preventDefault();
        const status = await signin(loginData);
        if (status === 200) {
            history.push('/users');
        }
    }
  return (
    <div className='login-wrapper'>
      <h2>SignIn</h2>
      <form>
        <div className="form-group mt-3">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
          />
        </div>
        <div className="form-group mt-3">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleSignin}>
          Signin
        </button>
        <div className="form-group mt-3">
          <Link to='/sign-up'>Don't have an account ?, SignUp here</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
