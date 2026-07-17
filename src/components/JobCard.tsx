import { type Job, type Status, STATUSES } from "../utils/jobs";

type JobCardProps = {
  job: Job;
  onStatusChange: (id: number | string, status: Status) => void;
};

const JobCard = ({ job, onStatusChange }: JobCardProps) => {
  const meta = [
    job.company,
    job.salary ? `£${job.salary.toLocaleString("en-GB")}` : null,
    job.location || null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="job-card">
      <div className="avatar">{job.company[0].toUpperCase()}</div>
      <div className="job-info">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-meta">{meta}</p>
      </div>
      <select
        className={`badge badge-${job.status}`}
        value={job.status}
        onChange={(e) => {
          const value = e.target.value;
          if (STATUSES.includes(value as Status)) {
            onStatusChange(job.id, value as Status);
          }
        }}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default JobCard;
