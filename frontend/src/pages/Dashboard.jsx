import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('/dashboard')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(e => {
        setErr(e.response?.data?.error || 'Error loading dashboard');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (err) return <div style={{ color: 'red' }}>{err}</div>;
  if (!data) return null;

  // Example shape: data = { user, jobs, bids, acceptedBids, notifications, portfolio }
  return (
    <div className="dashboard">
      <h2>Welcome, {data.user?.name || 'User'}!</h2>

      <section>
        <h3>Posted Jobs</h3>
        <ul>
          {data.jobs?.length
            ? data.jobs.map(job => (
                <li key={job.id}>
                  <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                  {' '}<span>({job.is_active ? 'Active' : 'Completed'})</span>
                </li>
              ))
            : <li>No jobs posted yet.</li>}
        </ul>
        <Link to="/post-job">+ Post a new job</Link>
      </section>

      <section>
        <h3>My Bids</h3>
        <ul>
          {data.bids?.length
            ? data.bids.map(bid => (
                <li key={bid.id}>
                  On <Link to={`/jobs/${bid.job_id}`}>{bid.job_title || `Job #${bid.job_id}`}</Link>:
                  ${bid.amount} — <b>{bid.status}</b>
                </li>
              ))
            : <li>No bids yet.</li>}
        </ul>
      </section>

      <section>
        <h3>Accepted/Won Jobs</h3>
        <ul>
          {data.acceptedBids?.length
            ? data.acceptedBids.map(bid => (
                <li key={bid.id}>
                  <Link to={`/jobs/${bid.job_id}`}>{bid.job_title || `Job #${bid.job_id}`}</Link>
                  — You bid ${bid.amount}
                </li>
              ))
            : <li>No accepted jobs yet.</li>}
        </ul>
      </section>

      <section>
        <h3>Notifications</h3>
        <ul>
          {data.notifications?.length
            ? data.notifications.slice(0, 5).map(n => (
                <li key={n.id}>
                  <b>{n.title || n.type}</b>: {n.message}
                  {n.link && <Link to={n.link}>View</Link>}
                  {n.is_read ? null : <span style={{ color: 'blue' }}> (new)</span>}
                </li>
              ))
            : <li>No notifications.</li>}
        </ul>
        <Link to="/notifications">See all notifications</Link>
      </section>

      <section>
        <h3>Portfolio</h3>
        <ul>
          {data.portfolio?.length
            ? data.portfolio.slice(0, 3).map(item => (
                <li key={item.id}>
                  <Link to={`/portfolio/${item.id}`}>{item.title}</Link>
                  {item.image_url && <img src={item.image_url} alt={item.title} width={40} />}
                </li>
              ))
            : <li>No portfolio items yet.</li>}
        </ul>
        <Link to="/portfolio">Manage portfolio</Link>
      </section>
    </div>
  );
}
