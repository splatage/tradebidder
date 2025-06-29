import React, { useEffect, useState } from "react";
import api from "../api/axios";
import JobCard from "../components/JobCard";


export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get("/jobs")
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(error => {
        setErr(error.response?.data?.error || "Failed to load jobs");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-neutral pb-20">
      <div className="max-w-2xl mx-auto px-2 py-4">
        <h1 className="text-2xl font-bold mb-4 text-dark">Available Jobs</h1>
        <div className="grid gap-4">
          {loading ? (
            <div>Loading jobs...</div>
          ) : err ? (
            <div className="text-red-600">{err}</div>
          ) : jobs.length ? (
            jobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <div>No jobs found.</div>
          )}
        </div>
      </div>
      <NavBar />
    </div>
  );
}

// Bottom navigation bar component
import { NavBar } from "../components/NavBar";
