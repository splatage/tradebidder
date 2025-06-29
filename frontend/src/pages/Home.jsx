import React, { useEffect, useState } from "react";
import api from "../api/axios";
import JobCard from "../components/JobCard";
import { NavBar } from "../components/NavBar";

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
        <h1 className="text-2xl font-bold mb-4 text-primary">Available Jobs</h1>
        <div className="grid gap-4">
          {loading ? (
            <div className="text-center text-primary animate-pulse py-8">Loading jobs...</div>
          ) : err ? (
            <div className="text-red-600 text-center py-8">{err}</div>
          ) : jobs.length ? (
            jobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="text-gray-500 text-center py-8">No jobs found.</div>
          )}
        </div>
      </div>
      <NavBar />
    </div>
  );
}
