import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <h1 className="title">USER!</h1>
        <form onSubmit={handleSubmit}>
          <div className="from">
            <label>Name*</label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              className="text-input"
              onChange={(event) => setname(event.target.value)} />
            {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
          </div>
          <div className="from">
            <label>Email*</label>
            <input type="email"
              value={email}
              placeholder="Enter your email"
              className="text-input"
              onChange={(event) => setEmail(event.target.value)} />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          </div>
          <div className="from">
            <label>Password*</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              className="text-input"
              onChange={(event) => setPassword(event.target.value)} required />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '510px',
                top: '58%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          </div>
          <div className="from">
            <label>Phone*</label>
            <input
              type="text"
              placeholder="Enter your number"
              value={phone}
              className="text-input"
              onChange={(event) => setPhone(event.target.value)} required />
            {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
          </div>
          <button type="submit" className='button'>Sign Up</button>
          {message && <p>{message}</p>}
        </form>
      </div>
  );
}

export default RegisterForm;