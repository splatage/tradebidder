import React, { useState } from 'react';
import axios from '../api/axios'; // Adjust import if axios is elsewhere

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('/users/register', form);
      setSuccess('Registration successful! Please check your email to verify.');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    }
  };

 return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md space-y-4"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
        <input
          name="name"
          type="text"
          className="w-full rounded-lg border px-3 py-2 text-base focus:outline-none focus:ring focus:border-blue-400"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          name="email"
          type="email"
          className="w-full rounded-lg border px-3 py-2 text-base focus:outline-none focus:ring focus:border-blue-400"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          className="w-full rounded-lg border px-3 py-2 text-base focus:outline-none focus:ring focus:border-blue-400"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition"
        >
          Register
        </button>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
      </form>
    </div>
  );
}
