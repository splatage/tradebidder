import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // your shared axios instance
import JobCard from '../components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    api.get('/jobs')
      .then(res => {
        setJobs(res.data); // Adjust if your backend returns { jobs: [...] }
        setLoading(false);
      })
      .catch(error => {
        setErr(error.response?.data?.error || 'Failed to load jobs');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-6">Loading jobs...</div>;
  if (err) return <div className="text-center py-6 text-red-600">{err}</div>;

  return (
    <div className="max-w-2xl mx-auto px-2 py-4">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
      <div className="grid gap-4">
        {jobs.length
          ? jobs.map(job => <JobCard key={job.id} job={job} />)
          : <div>No jobs found.</div>}
      </div>
    </div>
  );
}
