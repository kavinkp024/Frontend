import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (validateForm()) {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      const token = response.data;
      localStorage.setItem('authToken', token.access_token);
      localStorage.setItem('userId', token.decoded.id);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login error:', err); 
    }
     }
    else {
      console.log('Form has errors.');
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!password.trim()) {
      setPasswordError('Password is required.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format.');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  return (
    <div className='login'>
      <h1 className='form-login'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-form'>
          <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Email<span style={{ color: 'red' }}>*</span></label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="text"
            onChange={(e) => setemail(e.target.value)} />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
        <div className='input-form'>
          <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Password<span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            placeholder="Enter your Password"
            value={password}
            className="text"
            onChange={(e) => setPassword(e.target.value)} />
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        <button type="submit" className='button-login'>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;