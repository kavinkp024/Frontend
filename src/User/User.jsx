import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

function RegisterForm() {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate(); 


  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!phone.trim()) {
      setPhoneError('Phone number is required.');
      isValid = false;
    } else {
      setPhoneError('');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, phone }),
        });
        const data = await response.json();
        if (data.success) {
          setMessage(data.message);
          navigate('/login');
        } else {
          setMessage(data.message || 'Registration failed.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setMessage('An error occurred. Please try again.');
      }
    }
    else {
      console.log('Form has errors.');
    }
  };

  return (
    <div className="user-Container">
      <h1 className="user-title">USER!</h1>
      <form onSubmit={handleSubmit}>
        <div className="user-from">
          <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Name<span style={{ color: 'red'}}>*</span></label>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            className="user-input"
            onChange={(event) => setname(event.target.value)} />
          {nameError && <p style={{ color: 'red',fontStyle:'italic'}}>{nameError}</p>}
        </div>
        <div className="user-from">
          <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Email<span style={{ color: 'red' }}>*</span></label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            className="user-input"
            onChange={(event) => setEmail(event.target.value)} />
          {emailError && <p style={{ color: 'red',fontStyle:'italic'}}>{emailError}</p>}
          {message && <p style={{ color: 'red',fontStyle:'italic'}}>{message}</p>}
        </div>
        <div className="user-from">
          <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Password<span style={{ color: 'red' }}>*</span></label>
          <input
            type='text'
            placeholder="Enter your password"
            value={password}
            className="user-input"
            onChange={(event) => setPassword(event.target.value)} />
          {passwordError && <p style={{ color: 'red',fontStyle:'italic' }}>{passwordError}</p>}
        </div>
        <div className="user-from">
          <label style={{ fontSize: '22px', color: 'blue',fontFamily: 'Brush Script MT' }}>Phone <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            placeholder="Enter your number"
            value={phone}
            className="user-input"
            onChange={(event) => setPhone(event.target.value)} />
          {phoneError && <p style={{ color: 'red',fontStyle:'italic' }}>{phoneError}</p>}
        </div>
          <button type="submit" className='user-button'>Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterForm;