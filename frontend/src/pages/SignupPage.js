import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api/UserAPI';

const SignupPage = (props) => {
  let navigate = useNavigate();

  const handleSignup = async (evt) => {
    evt.preventDefault();
    let userObject = {
      'username': evt.target.username.value,
      'password': evt.target.password.value,
    }
  
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
      <h3 className="login-header">Signup!</h3>
      <Form className="login-form" onSubmit={handleSignup}>
        <Form.Group className="cred-form-div">
        <Form.Label className='login-header'>Username:</Form.Label>
        <Form.Control type='text' name='username' placeholder="username" />
        </Form.Group>
        <Form.Group className="cred-form-div">
        <Form.Label className='login-header'>Password:</Form.Label>
        <Form.Control type='password' name='password' placeholder="password"/>
        </Form.Group>
        <Button className="cred-button" type='submit' variant="success">Submit</Button>
      </Form>
    </Container>
  );
};

export default SignupPage;