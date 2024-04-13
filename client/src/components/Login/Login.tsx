import { useState } from 'react';
import { signInUser, signUpUser } from '../../api/userApi';
import { objToString, getUserFromJwt } from '../../util/util';
import  { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

Login.propTypes = {
  isSharePage: PropTypes.bool.isRequired,
}

function Login(props: any) {
  const { isSharePage } = props;
  const initialData = {
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') || '',
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(initialData.token);
  const [user, setUser] = useState(initialData.user);

  const handleLogin = async() => {
    if (email === '' || password === '') {
      alert('please enter email and password for login');
      return;
    }

    const payload = {
      user: {
        email,
        password,
      },
    };

    try {
      const res = await signInUser(payload);

      if (res.status === 200 && res?.data?.token) {
        const token = res?.data?.token as string;
        const user = getUserFromJwt(token);
        localStorage.setItem('token', token)
        localStorage.setItem('user', user)
        setToken(token);
        setUser(user);
        window.location.reload();
      } else {
        alert('error' + res.data);
      }
    } catch (error: any) {
      alert(objToString(error?.response?.data?.error));
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken('');
    setUser('');
  }

  const handleRegister = async() => {
    if (email === '' || password === '') {
      alert('please enter email and password for register');
      return;
    }

    const payload = {
      user: {
        email,
        password,
      },
    };

    try {
      const res = await signUpUser(payload);

      if (res.status === 201 && res?.data?.token) {
        const token = res?.data?.token as string;
        const user = getUserFromJwt(token);
        localStorage.setItem('token', token)
        localStorage.setItem('user', user)
        setToken(token);
        setUser(user);
        window.location.reload();
      }
      else {
        alert('error' + res.data);
      }
    } catch (error: any) {
      alert(objToString(error?.response?.data?.error));
    }
  }

  return(
    <div className='basis-1/2 h-12 mx-5 ml-auto'>
      {token === '' ? (
      <div id='non-logged' className='visible'>
        {/* <form id='sign-in' className='bg-white px-8'> */}
          <div className='flex'>
            <input
              className='shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-1'
              id='username'
              type='text'
              placeholder='Username'
              onChange={(event)=> setEmail(event.target.value)}
            />
            <input
              className='shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-1'
              id='password'
              type='password'
              placeholder='Password'
              onChange={(event)=> setPassword(event.target.value)}
            />
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mx-1'
              onClick={async () => handleLogin()}
            >Login</button>
            <button
              className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-3 rounded mx-1'
              onClick={() => handleRegister()}
            >Register</button>
          </div>
        {/* </form> */}
      </div> ) : (
      <div id='logged'>
        <p>Welcome: {user} </p>
      {!isSharePage &&
        <Link to='/shares'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mx-1'
          >Share Video</button>
        </Link>
      }
        <Link to='/'>
          <button
            className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-3 rounded mx-1'
            onClick={() => handleLogout()}
          >Logout</button>
        </Link>
      </div>
      )}
    </div>
  )
}

export default Login;
