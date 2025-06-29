import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get("/dashboard")
      .then(res => { setData(res.data); setLoading(false); })
      .catch(e => { setErr(e.response?.data?.error || "Error loading dashboard"); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-6">Loading dashboard...</div>;
  if (err) return <div className="text-center py-6 text-red-600">{err}</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-neutral pb-20">
      <div className="max-w-2xl mx-auto space-y-6 px-2 py-4">
        <h2 className="text-xl font-bold text-center mt-4 text-dark">
          Welcome, {data.user?.name || "User"}!
        </h2>

        {/* Posted Jobs */}
        <section className="bg-card rounded-xl shadow-card p-4">
          <h3 className="font-semibold text-lg mb-2">Posted Jobs</h3>
          <ul className="space-y-1">
            {data.jobs?.length
              ? data.jobs.map(job => (
                  <li key={job.id}>
                    <Link to={`/jobs/${job.id}`} className="text-primary underline">{job.title}</Link>
                    {" "}
                    <span className="text-xs ml-2 px-2 py-0.5 rounded bg-gray-200">
                      {job.is_active ? "Active" : "Completed"}
                    </span>
                  </li>
                ))
              : <li className="text-gray-500">No jobs posted yet.</li>}
          </ul>
          <Link to="/post-job" className="block mt-2 text-blue-700 font-medium underline text-sm">+ Post a new job</Link>
        </section>

        {/* Bids */}
        <section className="bg-card rounded-xl shadow-card p-4">
          <h3 className="font-semibold text-lg mb-2">My Bids</h3>
          <ul>
            {data.bids?.length
              ? data.bids.map(bid => (
                  <li key={bid.id}>
                    On <Link to={`/jobs/${bid.job_id}`} className="text-primary underline">
                      {bid.job_title || `Job #${bid.job_id}`}
                    </Link>: ${bid.amount} — <b>{bid.status}</b>
                  </li>
                ))
              : <li className="text-gray-500">No bids yet.</li>}
          </ul>
        </section>

        {/* Accepted Bids */}
        <section className="bg-card rounded-xl shadow-card p-4">
          <h3 className="font-semibold text-lg mb-2">Accepted/Won Jobs</h3>
          <ul>
            {data.acceptedBids?.length
              ? data.acceptedBids.map(bid => (
                  <li key={bid.id}>
                    <Link to={`/jobs/${bid.job_id}`} className="text-primary underline">
                      {bid.job_title || `Job #${bid.job_id}`}
                    </Link> — You bid ${bid.amount}
                  </li>
                ))
              : <li className="text-gray-500">No accepted jobs yet.</li>}
          </ul>
        </section>

        {/* Notifications */}
        <section className="bg-card rounded-xl shadow-card p-4">
          <h3 className="font-semibold text-lg mb-2">Notifications</h3>
          <ul>
            {data.notifications?.length
              ? data.notifications.slice(0, 5).map(n => (
                  <li key={n.id}>
                    <b>{n.title || n.type}</b>: {n.message}
                    {n.link && <Link to={n.link} className="text-primary underline ml-1">View</Link>}
                    {n.is_read ? null : <span className="text-blue-600"> (new)</span>}
                  </li>
                ))
              : <li className="text-gray-500">No notifications.</li>}
          </ul>
          <Link to="/notifications" className="block mt-2 text-blue-700 underline text-sm">See all notifications</Link>
        </section>

        {/* Portfolio */}
        <section className="bg-card rounded-xl shadow-card p-4">
          <h3 className="font-semibold text-lg mb-2">Portfolio</h3>
          <ul>
            {data.portfolio?.length
              ? data.portfolio.slice(0, 3).map(item => (
                  <li key={item.id}>
                    <Link to={`/portfolio/${item.id}`} className="text-primary underline">{item.title}</Link>
                    {item.image_url && <img src={item.image_url} alt={item.title} className="inline ml-2 w-8 h-8 rounded object-cover" />}
                  </li>
                ))
              : <li className="text-gray-500">No portfolio items yet.</li>}
          </ul>
          <Link to="/portfolio" className="block mt-2 text-blue-700 underline text-sm">Manage portfolio</Link>
        </section>
      </div>
      <NavBar />
    </div>
  );
}
import { NavBar } from "../components/NavBar";
