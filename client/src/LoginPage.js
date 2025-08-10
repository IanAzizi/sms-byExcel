// server/LoginPage.js
import React, { useState } from 'react';
import './index.css';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin() {
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.token) {
        onLogin(username, data.token);
      }
    } catch (err) {
      setMessage('خطا در ورود');
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>ورود به سیستم</h2>
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.button}>
          ورود
        </button>
        <p style={styles.message}>{message}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
  },
  card: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: 320,
    textAlign: 'center',
  },
  title: {
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    margin: '10px 0',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#667eea',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 6,
    cursor: 'pointer',
    marginTop: 10,
    
  },
  message: {
    marginTop: 15,
    color: 'red',
    minHeight: 20,
  },
};
