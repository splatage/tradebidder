import React, { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await api.post("/users/register", form);
      setSuccess("Registration successful! Please check your email to verify.");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-2xl shadow-card p-6 flex flex-col gap-3 w-full max-w-sm mx-auto"
        autoComplete="off"
      >
        <h2 className="text-xl font-bold text-center mb-2">Register</h2>
        <input name="name" type="text" className="border rounded-xl px-4 py-2 text-base focus:outline-primary" value={form.name} onChange={handleChange} placeholder="Full Name" required />
        <input name="email" type="email" className="border rounded-xl px-4 py-2 text-base focus:outline-primary" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" className="border rounded-xl px-4 py-2 text-base focus:outline-primary" value={form.password} onChange={handleChange} placeholder="Password" required />
        <button className="rounded-xl bg-primary text-white font-semibold py-2 shadow hover:bg-blue-700 active:bg-blue-800 transition" type="submit">Register</button>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
      </form>
    </div>
  );
}
