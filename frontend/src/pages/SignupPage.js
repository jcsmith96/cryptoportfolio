import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../api/UserAPI';

const SignupPage = (props) => {
  let navigate = useNavigate();

  const handleSignup = async (evt) => {
    evt.preventDefault();
    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
    }
    console.log(userObject)
    let response = await signupUser(userObject);
    let data = await response.json();
    if (data.error) {
      console.log('there was an error signing up');
    } else {
      navigate('/login');
    }

  }

  return (
    <Container className='login-div'>
      <h1 className="login-header">Signup Page</h1>
      <form onSubmit={handleSignup}>
        <label className="login-header">UserName:</label>
        <input type='text'name='username' />
        <label className="login-header">Password:</label>
        <input type='password' name='password' />
        <button type='submit' >Sign Up</button>
      </form>
    </Container>
  );
};

export default SignupPage;