import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  if (!job) return null;
  return (
    <Link to={`/jobs/${job.id}`} className="block group">
      <div className="p-4 bg-card rounded-2xl shadow-card flex items-center gap-4 transition hover:bg-blue-50">
        {/* Placeholder icon */}
        <div className="w-12 h-12 bg-neutral rounded-xl flex items-center justify-center text-primary flex-shrink-0">
          <span className="material-icons text-3xl">build</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg truncate text-primary group-hover:underline">{job.title}</h2>
          <div className="text-xs text-secondary font-medium mb-1">{job.industry}</div>
          <div className="text-sm text-gray-600 mb-1 truncate">
            {job.location_city}
            {job.location_region ? `, ${job.location_region}` : ''}
          </div>
          <div className="text-gray-700 mb-2 line-clamp-2">{job.description}</div>
          <div className="font-semibold text-accent">${job.budget}</div>
        </div>
        {/* Optionally, a right-arrow for mobile navigation */}
        <span className="material-icons text-gray-300 group-hover:text-primary">chevron_right</span>
      </div>
    </Link>
  );
}
