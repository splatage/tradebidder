import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/users/login", form);
      // Store JWT/session as needed
      // localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-2xl shadow-card p-6 flex flex-col gap-3 w-full max-w-sm mx-auto"
        autoComplete="off"
      >
        <h2 className="text-xl font-bold text-center mb-2">Sign In</h2>
        <input name="email" type="email" className="border rounded-xl px-4 py-2 text-base focus:outline-primary" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" className="border rounded-xl px-4 py-2 text-base focus:outline-primary" value={form.password} onChange={handleChange} placeholder="Password" required />
        <button className="rounded-xl bg-primary text-white font-semibold py-2 shadow hover:bg-blue-700 active:bg-blue-800 transition" type="submit">Login</button>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      </form>
    </div>
  );
}
