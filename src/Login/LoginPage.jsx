import { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      const token = response.data;
      localStorage.setItem('authToken', token);
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login error:', err);
    }
  };

  return (
    <div className='user-Container'>
      <h1 className='title'>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div className='from'>
          <input
            type="email"
            placeholder="email"
            value={email}
            className="text-input"
            onChange={(e) => setemail(e.target.value)} />
        </div>
        <div className='from'>
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="text-input"
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className='button'>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;