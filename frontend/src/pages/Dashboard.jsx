import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(setJobs)
      .catch(err => console.error('Failed to fetch jobs:', err));
  }, []);

  return (
    <div style={containerStyle}>
      <h2>Your Dashboard</h2>
      {jobs.length === 0 ? (
        <p>No jobs found. Try posting one!</p>
      ) : (
        <div style={gridStyle}>
          {jobs.map(job => (
            <div key={job.id} style={cardStyle}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Budget:</strong> ${job.budget}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <button style={buttonStyle}>View Job</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px'
};

const cardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const buttonStyle = {
  marginTop: '10px',
  padding: '8px 12px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};
