import React, { useState } from 'react';
import axios from '../api/axios'; // Adjust import if axios is elsewhere
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/users/login', form);
      // Save JWT/token/user info here as needed (example: localStorage)
      // localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Redirect to dashboard or home
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      {/* Optionally, link to Register or Forgot Password */}
    </div>
  );
}
