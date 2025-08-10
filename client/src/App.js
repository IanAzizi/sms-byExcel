import React, { useState } from 'react';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import './index.css';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  function handleLogin(user, tok) {
    setUsername(user);
    setToken(tok);
    setLoggedIn(true);
  }

  function handleLogout() {
    setUsername('');
    setToken('');
    setLoggedIn(false);
  }

  return (
    <>
      {loggedIn ? (
        <DashboardPage username={username} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
