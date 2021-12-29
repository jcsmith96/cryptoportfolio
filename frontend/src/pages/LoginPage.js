import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap'

const Login = ({isLoggedIn, handleLogout, handleLogin, loginError}) => { 

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
    <h3 className="login-header">Please Login!</h3>
      { loginError &&
        <p className="login-error-message">Invalid username/password. Please try again.</p>
      }
      <Form className="login-form" onSubmit={handleLogin}>
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
    </div>
  );
};

export default Login;