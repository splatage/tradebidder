import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setDashboard(data);
      })
      .catch(() => {
        setUser(null);
        setDashboard(null);
      });
  }, []);

  return (
    <div style={containerStyle}>
      {user ? (
        <>
          <h2>Welcome back, {user.name}!</h2>
          <div style={statsContainer}>
            <Stat label="Jobs Posted" value={dashboard.stats.jobsPosted} />
            <Stat label="Jobs Won" value={dashboard.stats.jobsWon} />
            <Stat label="Messages" value={dashboard.stats.messages} />
            <Stat label="Reviews" value={dashboard.stats.reviews} />
          </div>
          <h3>Your Jobs</h3>
          <div style={jobList}>
            {dashboard.jobs.map(job => (
              <div key={job.id} style={jobCard}>
                <strong>{job.title}</strong><br />
                {job.description}<br />
                <small>{job.location} - ${job.budget}</small>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Welcome to TradeBidder</h2>
          <p>Find skilled tradespeople or get hired for jobs near you.</p>
          <Link to="/login" style={buttonStyle}>Login</Link>{' '}
          <Link to="/register" style={buttonStyle}>Register</Link>
          <h3>Recent Jobs</h3>
          <div style={jobList}>
            <div style={jobCard}><strong>Paint fence</strong><br />Residential repaint<br /><small>Auckland - $250</small></div>
            <div style={jobCard}><strong>Fix sink</strong><br />Plumbing issue<br /><small>Wellington - $120</small></div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={statBox}>
      <strong>{value}</strong><br />
      <small>{label}</small>
    </div>
  );
}

const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const statsContainer = {
  display: 'flex',
  gap: '20px',
  marginBottom: '20px'
};

const statBox = {
  padding: '10px 20px',
  background: '#f4f4f4',
  borderRadius: '6px',
  textAlign: 'center'
};

const jobList = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  marginTop: '10px'
};

const jobCard = {
  background: '#fff',
  border: '1px solid #ddd',
  padding: '10px',
  borderRadius: '6px'
};

const buttonStyle = {
  display: 'inline-block',
  padding: '8px 12px',
  backgroundColor: '#007bff',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '4px',
  marginRight: '10px'
};
