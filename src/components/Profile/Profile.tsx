import React, { useState } from 'react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom'
import classes from './profile.module.scss';

interface User {
  email: string;
  password: string;
}

export const Profile: FunctionComponent = () => {
  // State to manage the input values
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [isRegistration, setIsRegistration] = useState(false);

  const navigate = useNavigate();

  // Function to handle registration
  const handleRegister = (e) => {
    e.preventDefault();
  
    if (isRegistration) {
      // Check if any of the required fields are empty
      if (!name || !id || !email || !phone || !password) {
        alert('Please fill in all required fields.');
        return;
      }
  
      // Get existing users from local storage or initialize an empty array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
      // Check if the user with the same email already exists
      const userExists = existingUsers.some((user) => user.email === email);
  
      if (userExists) {
        alert('User with this email already exists.');
      } else {
        // Add the new user to the array
        const newUser = { name, id, email, phone, password };
        existingUsers.push(newUser);
  
        // Save the updated user array in local storage
        localStorage.setItem('users', JSON.stringify(existingUsers));
  
        alert('User registered successfully!');
        // Clear the input fields and labels
        setName('');
        setId('');
        setEmail('');
        setPhone('');
        setPassword('');
      }
    } else {
      setIsRegistration(true);
    }
  };

  // Function to handle login
  const handleLogin = (e) => {
    e.preventDefault();

    // Get existing users from local storage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the user with the provided email and password exists
    const user = existingUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      navigate('/products')

    } else {
      alert('Credenciais invalidas. Tente novamente');
    }
  };

  return (
    <section className={classes.profile}>
      <h1>{isRegistration ? 'Register' : 'Login'}</h1>

      <div className={classes.container}>
        {isRegistration && (
          <>
            <div className={classes.inputGroup}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={classes.inputGroup}>
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
            <div className={classes.inputGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={classes.inputGroup}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className={classes.inputGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}
        {!isRegistration && (
          <>
            <div className={classes.inputGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={classes.inputGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </>
        )}
      </div>

      <div className={classes.buttonGroup}>
  {isRegistration ? (
    <>
      <button type="button" onClick={() => setIsRegistration(false)}>
        Switch to Login
      </button>
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </>
  ) : (
    <>
      <button type="button" onClick={() => setIsRegistration(true)}>
        Switch to Registration
      </button>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </>
  )}
</div>

    </section>
  );
};
//localStorage.clear();