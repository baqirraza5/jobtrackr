import { STATUSES } from "../utils/jobs";

const JobCard = ({ job, onStatusChange }) => {
  return (
    <div className="card">
      <div className="logo" />
      <div className="info">
        <h3>{job.title}</h3>
        <p>
          {job.company} - £{job.salary}
        </p>
        <p>{job.location}</p>
      </div>
      <select
        value={job.status}
        onChange={(e) => onStatusChange(job.id, e.target.value)}
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
