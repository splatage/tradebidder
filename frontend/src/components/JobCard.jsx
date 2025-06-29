import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  if (!job) return null;
  return (
    <div className="p-4 bg-white rounded-xl shadow flex flex-col">
      <h2 className="font-bold text-lg">{job.title}</h2>
      <div className="text-sm text-gray-600 mb-2">{job.location_city}{job.location_region ? `, ${job.location_region}` : ''}</div>
      <div className="text-gray-700 mb-2 line-clamp-3">{job.description}</div>
      <div className="font-semibold text-blue-600 mb-1">${job.budget}</div>
      <Link to={`/jobs/${job.id}`}>View Job</Link>
    </div>
  );
}
