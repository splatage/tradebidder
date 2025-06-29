import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

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

  if (loading) return <div className="text-center py-6">Loading job details...</div>;
  if (err) return <div className="text-center py-6 text-red-600">{err}</div>;
  if (!job) return null;

  return (
    <div className="min-h-screen bg-neutral flex flex-col pb-20">
      <div className="max-w-2xl mx-auto px-4 py-6 bg-card rounded-2xl shadow-card">
        <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
        <div className="text-green-700 font-semibold text-sm mb-1">{job.industry}</div>
        <div className="text-gray-500 mb-2">
          {job.location_city}
          {job.location_region ? `, ${job.location_region}` : ""}
        </div>
        <div className="text-base mb-4">{job.description}</div>
        <div className="mb-4">
          <span className="font-semibold text-primary text-lg">${job.budget}</span>
        </div>
        <div className="text-sm text-gray-600 mb-2">
          Posted: {job.created_at ? new Date(job.created_at).toLocaleString() : ""}
        </div>
        {/* Add bidding UI here */}
      </div>
      <NavBar />
    </div>
  );
}
import { NavBar } from "../components/NavBar";
