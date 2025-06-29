import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { NavBar } from "../components/NavBar";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(res => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(error => {
        setErr(error.response?.data?.error || "Failed to load job");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <div className="flex items-center justify-center min-h-screen text-primary text-lg animate-pulse">Loading job details...</div>;
  if (err)
    return <div className="flex items-center justify-center min-h-screen text-red-600">{err}</div>;
  if (!job) return null;

  return (
    <div className="min-h-screen bg-neutral flex flex-col pb-24">
      <div className="max-w-2xl mx-auto px-4 py-6 bg-card rounded-2xl shadow-card mt-4">
        {/* Job Icon */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-neutral rounded-xl flex items-center justify-center text-primary flex-shrink-0">
            <span className="material-icons text-4xl">build</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">{job.title}</h1>
            <div className="text-secondary font-semibold text-sm">{job.industry}</div>
            <div className="text-gray-500">
              {job.location_city}
              {job.location_region ? `, ${job.location_region}` : ""}
            </div>
          </div>
        </div>
        <div className="text-base mb-4">{job.description}</div>
        <div className="mb-4">
          <span className="font-semibold text-accent text-lg">${job.budget}</span>
        </div>
        <div className="text-sm text-gray-600 mb-6">
          Posted: {job.created_at ? new Date(job.created_at).toLocaleString() : ""}
        </div>
        {/* Placeholder for bidding UI */}
        <button className="w-full py-3 bg-primary text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition">
          Place a Bid
        </button>
      </div>
      <NavBar />
    </div>
  );
}

