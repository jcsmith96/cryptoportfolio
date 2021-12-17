import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = ({isLoggedIn, handleLogout, handleLogin}) => { 

  const navigate = useNavigate()

  if (isLoggedIn) {
    navigate('/')
    return <div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <Link to='/'>Home</Link>
      </div>
    </div>
  }

  return (
    <div className="login-div">
    <h1 className="login-header">Login Page</h1>
      <form onSubmit={handleLogin}>
        <label className='login-header'>UserName:</label>
        <input type='text' name='username' />
        <label className='login-header'>Password:</label>
        <input type='password' name='password' />
        <button type='submit' >Submit</button>
      </form>
    </div>
  );
};

export default Login;