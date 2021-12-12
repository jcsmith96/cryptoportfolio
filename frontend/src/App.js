import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

//components
import AppNav from './components/AppNav';

// pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';



import UserContext from './contexts/UserContext.js';
import { getLoggedInUser, login } from './api/UserAPI';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ user, setUser ] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("auth-user") !== 'null') {
        let response = await getLoggedInUser(localStorage.getItem("auth-user"));
        let data = await response.json();
        if (data.username) {
          setIsLoggedIn(true);
          setUser(data);
        }
      }
    }
    if (!user) {
      getUser();
    }
  }, [user])

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let userObject = {
      username: evt.target.username.value,
      password: evt.target.password.value,
    }
    let response = await login(userObject);
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("auth-user", `${data.token}`);
      setIsLoggedIn(true);
      setUser(data.user);
    }
  }

  const handleLogout = () => {
    localStorage.setItem("auth-user", null);
    setIsLoggedIn(false);
    setUser(null);
  }


  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user: user, setUser: handleLogin, error: error }}>
        <AppNav isLoggedIn={isLoggedIn} handleLogout={handleLogout} setUser={setUser} user={user}/>
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} user={user} />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;