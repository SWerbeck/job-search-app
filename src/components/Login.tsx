import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const login = async () => {
    try {
      const loggedInUser = await axios.post(
        'http://localhost:3000/api/auth/login',
        {
          email: email,
          user_password: password,
          withCredentials: true,
        }
      );
      window.localStorage.setItem('token', loggedInUser.data.token.accessToken);
      console.log('token login form', loggedInUser.data.token);
      navigate(`/home/${loggedInUser.data.id}`);
    } catch (error) {
      setEmailError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  const logout = async () => {
    const token = window.localStorage.getItem('token');
    const loggedOut = await axios.delete(
      'http://localhost:3000/api/auth/logout'
    );
    window.localStorage.removeItem('token');
    navigate('/');
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
      {emailError.length ? <p>{emailError}</p> : <p></p>}
    </div>
  );
};

export default Login;
