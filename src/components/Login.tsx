import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const login = async () => {
    try {
      const loggedInUser = await axios.post('/api/auth/login', {
        email: email,
        user_password: password,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const accessToken = loggedInUser?.data?.token?.accessToken;
      const refreshToken = loggedInUser?.data?.token?.refreshToken;
      setAuth({ email, password, accessToken, refreshToken });
      console.log(
        'LOGGED IN USER DATA',
        loggedInUser?.data?.token?.accessToken
      );
      navigate(`/home/${loggedInUser?.data?.id}`);
    } catch (error) {
      setEmailError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  const logout = async () => {
    const loggedOut = await axios.delete(
      'http://localhost:3000/api/auth/logout'
    );
    //window.localStorage.removeItem('token');
    navigate('/login');
    console.log(loggedOut.data.message);
  };

  return (
    <>
      <>
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
        {emailError.length ? <p>{emailError}</p> : <p></p>}
      </>
      <button onClick={logout}>Log out</button>
    </>
  );
};

export default Login;
