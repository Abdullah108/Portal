import React, { useState } from 'react';

import './login.css';

import { Link } from 'react-router-dom';

import axios from 'axios';

const LoginClient = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrong, setWrong] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:9000/api/sign-in', {
        email: email,
        password: password,
      })

      .then(function (response) {
        console.log(response);
        sessionStorage.setItem(
          'token',
          response.data.token
        );
        sessionStorage.setItem(
          'id',
          response.data.id
        );
        sessionStorage.setItem(
          'userName',
          response.data.userName
        );
        if (response.data.role === 'admin') {
          props.history.push('/admin');
        } else {
          props.history.push('/client');
        }
      })
      .catch(function (error) {
        setWrong(true);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <div className="center">
      <h2>Welcome to the Client Portal</h2>
      <h2>Please Login to Access Your Account</h2>

      <form onSubmit={login}>
        <div className="txt_field">
          <label>Username: </label>

          <input
            type="text"
            required
            onChange={(event) => {
              setWrong(false);
              setEmail(event.target.value);
            }}
            style={{
              border: `${
                wrong
                  ? '2px solid red'
                  : '1px solid #adadad'
              }`,
            }}
          />
        </div>

        <div className="txt_field">
          <label>Password: </label>

          <input
            type="password"
            required
            onChange={(event) => {
              setWrong(false);
              setPassword(event.target.value);
            }}
            style={{
              border: `${
                wrong
                  ? '2px solid red'
                  : '1px solid #adadad'
              }`,
            }}
          />
        </div>

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginClient;
