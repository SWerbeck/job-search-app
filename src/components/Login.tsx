import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const loggedInUser = await axios.post(
      'http://localhost:3000/api/auth/login',
      {
        email: email,
        user_password: password,
      }
    );
    console.log(loggedInUser);
  };

  const logout = async () => {
    const loggedOut = await axios.delete(
      'http://localhost:3000/api/auth/logout'
    );
    console.log(loggedOut.data.message);
  };

  return (
    <div>
      <h1>Login page</h1>
      <input
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>Log in</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Login;
