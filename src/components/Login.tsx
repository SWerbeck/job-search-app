// import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';
import axios from '../../server/api/axios';
//import useAxiosPrivate from '../custom-hooks/useAxiosPrivate';

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  //const axiosPrivate = useAxiosPrivate();

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
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log('logged in userrrr', loggedInUser);
      const user_id = loggedInUser?.data?.id;
      const accessToken = loggedInUser?.data?.token?.accessToken;
      const refreshToken = loggedInUser?.data?.token?.refreshToken;
      setAuth({ email, password, user_id, accessToken, refreshToken });
      navigate(`/home/${loggedInUser?.data?.id}`);
      // navigate(from, { replace: true });
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
